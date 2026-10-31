import { PHASE_1_LESSONS } from './phase1';
import { PHASE_2_LESSONS } from './phase2';
import { PHASE_3_LESSONS } from './phase3';
import { PHASE_4_LESSONS } from './phase4';
import { PHASE_5_LESSONS } from './phase5';
import { PHASE_6_LESSONS } from './phase6';
import { SHOPIFY_DEV_LESSONS } from './shopifyDevLessons';
import { enrichLesson } from './lessonEnricher';
const RAW_LESSONS = [
    ...PHASE_1_LESSONS,
    ...PHASE_2_LESSONS,
    ...PHASE_3_LESSONS,
    ...PHASE_4_LESSONS,
    ...PHASE_5_LESSONS,
    ...PHASE_6_LESSONS,
    ...SHOPIFY_DEV_LESSONS,
];
export const ALL_LESSONS = RAW_LESSONS.map(enrichLesson);
export function getLessonBySlug(slug) {
    const lesson = ALL_LESSONS.find((l) => l.slug === slug);
    return lesson;
}
export function getLessonById(id) {
    const lesson = ALL_LESSONS.find((l) => l.id === id);
    return lesson;
}
export function getLessonsByModuleId(moduleId) {
    return ALL_LESSONS.filter((l) => l.moduleId === moduleId);
}
export function getNextLessonSlug(currentSlug) {
    const index = ALL_LESSONS.findIndex((l) => l.slug === currentSlug);
    if (index >= 0 && index < ALL_LESSONS.length - 1) {
        return ALL_LESSONS[index + 1].slug;
    }
    return null;
}
export function getPrevLessonSlug(currentSlug) {
    const index = ALL_LESSONS.findIndex((l) => l.slug === currentSlug);
    if (index > 0) {
        return ALL_LESSONS[index - 1].slug;
    }
    return null;
}
