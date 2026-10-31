export interface MockStoreData {
  shop: {
    name: string;
    currency: string;
    free_shipping_threshold: number;
  };
  product: {
    id: number;
    title: string;
    vendor: string;
    price: number; // in cents e.g. 8400 ($84.00)
    compare_at_price: number; // in cents e.g. 11000 ($110.00)
    available: boolean;
    description: string;
    images: string[];
    variants: Array<{
      id: number;
      title: string;
      price: number;
      available: boolean;
      inventory_quantity: number;
    }>;
    tags: string[];
  };
  cart: {
    item_count: number;
    total_price: number; // in cents e.g. 5500 ($55.00)
    items: Array<{
      id: number;
      title: string;
      quantity: number;
      price: number;
      image: string;
    }>;
  };
  customer: {
    first_name: string;
    email: string;
    orders_count: number;
    tags: string[];
  };
}

export const defaultMockStore: MockStoreData = {
  shop: {
    name: 'Aura Studio Goods',
    currency: 'USD',
    free_shipping_threshold: 7500, // $75.00
  },
  product: {
    id: 101,
    title: 'Minimalist Merino Wool Crewneck',
    vendor: 'Aura Essentials',
    price: 8400, // $84.00
    compare_at_price: 11000, // $110.00
    available: true,
    description: 'Ultra-soft 19.5 micron merino wool engineered for thermoregulation and effortless all-day comfort.',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80',
    ],
    variants: [
      { id: 1, title: 'Small / Charcoal', price: 8400, available: true, inventory_quantity: 4 },
      { id: 2, title: 'Medium / Charcoal', price: 8400, available: true, inventory_quantity: 12 },
      { id: 3, title: 'Large / Charcoal', price: 8400, available: false, inventory_quantity: 0 },
    ],
    tags: ['bestseller', 'sustainable', 'new-release'],
  },
  cart: {
    item_count: 1,
    total_price: 5500, // $55.00
    items: [
      {
        id: 201,
        title: 'Bamboo Ribbed Beanie - Heather Gray',
        quantity: 1,
        price: 5500,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&auto=format&fit=crop&q=80',
      },
    ],
  },
  customer: {
    first_name: 'Elena',
    email: 'elena.dev@example.com',
    orders_count: 2,
    tags: ['vip', 'newsletter_subscriber'],
  },
};

export function formatMoney(cents: number, currency: string = '$'): string {
  return `${currency}${(cents / 100).toFixed(2)}`;
}

/**
 * Client-side Liquid interpreter for previewing Liquid snippets with mock Shopify context
 */
export function renderLiquid(template: string, data: MockStoreData = defaultMockStore): string {
  let output = template;

  // 1. Process basic loops: {% for var in collection %} ... {% endfor %}
  const loopRegex = /\{%\s*for\s+(\w+)\s+in\s+([\w\.]+)\s*%\}([\s\S]*?)\{%\s*endfor\s*%\}/g;
  output = output.replace(loopRegex, (_, varName, targetPath, innerContent) => {
    const items = resolvePath(data, targetPath);
    if (!Array.isArray(items)) return '';

    return items
      .map((item) => {
        let iteration = innerContent;
        // replace {{ varName.prop }}
        const propRegex = new RegExp(`\\{\\{\\s*${varName}\\.([\\w\\|\\s_]+)\\s*\\}\\}`, 'g');
        iteration = iteration.replace(propRegex, (_: string, propWithFilters: string) => {
          const [prop, ...filterChain] = propWithFilters.split('|').map((s: string) => s.trim());
          let val = item[prop];
          if (filterChain.length > 0) {
            val = applyFilters(val, filterChain, data);
          }
          return val !== undefined ? String(val) : '';
        });

        // replace {{ varName }}
        const directRegex = new RegExp(`\\{\\{\\s*${varName}\\s*\\}\\}`, 'g');
        iteration = iteration.replace(directRegex, () => (typeof item === 'object' ? JSON.stringify(item) : String(item)));

        return iteration;
      })
      .join('');
  });

  // 2. Process conditionals: {% if condition %} ... {% else %} ... {% endif %}
  const ifElseRegex = /\{%\s*if\s+([\s\S]+?)\s*%\}([\s\S]*?)(?:\{%\s*else\s*%\}([\s\S]*?))?\{%\s*endif\s*%\}/g;
  output = output.replace(ifElseRegex, (_, condition, ifBlock, elseBlock = '') => {
    const isTrue = evaluateCondition(condition.trim(), data);
    return isTrue ? ifBlock : elseBlock;
  });

  // 3. Process variables: {{ path | filter1 | filter2 }}
  const varRegex = /\{\{\s*([\w\.]+)(?:\s*\|\s*([^}]+))?\s*\}\}/g;
  output = output.replace(varRegex, (_, path, filterString) => {
    let val = resolvePath(data, path.trim());
    if (filterString) {
      const filterChain = filterString.split('|').map((s: string) => s.trim());
      val = applyFilters(val, filterChain, data);
    }
    return val !== undefined && val !== null ? String(val) : '';
  });

  // 4. Clean up any leftover liquid comments: {% comment %} ... {% endcomment %}
  output = output.replace(/\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}/g, '');

  return output;
}

function resolvePath(obj: any, path: string): any {
  const parts = path.split('.');
  let curr = obj;
  for (const part of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[part];
  }
  return curr;
}

function evaluateCondition(cond: string, data: MockStoreData): boolean {
  // Support comparisons: >, <, >=, <=, ==, !=, contains
  const ops = ['>=', '<=', '!=', '==', '>', '<', 'contains'];
  for (const op of ops) {
    if (cond.includes(op)) {
      const [leftRaw, rightRaw] = cond.split(op).map((s) => s.trim());
      const leftVal = resolveValueOrLiteral(leftRaw, data);
      const rightVal = resolveValueOrLiteral(rightRaw, data);

      switch (op) {
        case '>=': return Number(leftVal) >= Number(rightVal);
        case '<=': return Number(leftVal) <= Number(rightVal);
        case '!=': return leftVal != rightVal;
        case '==': return leftVal == rightVal;
        case '>': return Number(leftVal) > Number(rightVal);
        case '<': return Number(leftVal) < Number(rightVal);
        case 'contains':
          if (Array.isArray(leftVal)) return leftVal.includes(rightVal);
          return String(leftVal).toLowerCase().includes(String(rightVal).toLowerCase());
      }
    }
  }

  // Boolean truthy check
  const val = resolveValueOrLiteral(cond, data);
  return Boolean(val);
}

function resolveValueOrLiteral(str: string, data: MockStoreData): any {
  // String literal 'xyz' or "xyz"
  if ((str.startsWith("'") && str.endsWith("'")) || (str.startsWith('"') && str.endsWith('"'))) {
    return str.slice(1, -1);
  }
  // Number
  if (!isNaN(Number(str))) {
    return Number(str);
  }
  // Boolean
  if (str === 'true') return true;
  if (str === 'false') return false;
  // Path
  return resolvePath(data, str);
}

function applyFilters(value: any, filters: string[], data: MockStoreData): any {
  let result = value;
  for (const f of filters) {
    const [name, ...argParts] = f.split(':').map((s) => s.trim());
    switch (name) {
      case 'money':
        result = formatMoney(Number(result) || 0, '$');
        break;
      case 'upcase':
        result = String(result).toUpperCase();
        break;
      case 'downcase':
        result = String(result).toLowerCase();
        break;
      case 'size':
        result = Array.isArray(result) ? result.length : String(result).length;
        break;
      case 'divided_by':
        const div = Number(argParts[0]) || 1;
        result = Math.round((Number(result) || 0) / div);
        break;
      case 'times':
        const mul = Number(argParts[0]) || 1;
        result = (Number(result) || 0) * mul;
        break;
      case 'minus':
        const sub = Number(resolveValueOrLiteral(argParts[0] || '0', data)) || 0;
        result = (Number(result) || 0) - sub;
        break;
      case 'plus':
        const add = Number(resolveValueOrLiteral(argParts[0] || '0', data)) || 0;
        result = (Number(result) || 0) + add;
        break;
      case 'default':
        if (!result) result = argParts[0]?.replace(/['"]/g, '');
        break;
    }
  }
  return result;
}
