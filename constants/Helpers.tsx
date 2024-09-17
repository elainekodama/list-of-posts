const SECONDS_IN_MINUTE = 60;
const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;
const SECONDS_IN_WEEK = 7 * SECONDS_IN_DAY;
const SECONDS_IN_MONTH = 30 * SECONDS_IN_DAY;
const SECONDS_IN_YEAR = 365 * SECONDS_IN_DAY;

/**
 * Returns a string to show date relative to today
 * @param date 
 * @returns 
 */
export function getRelativeDateString(dateString: string) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.valueOf() - date.valueOf()) / 1000);
    if (diffInSeconds < SECONDS_IN_MINUTE) {
        return `A few moments ago`;
    } else if (diffInSeconds < SECONDS_IN_HOUR) {
        const minutes = Math.floor(diffInSeconds / SECONDS_IN_MINUTE);
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < SECONDS_IN_DAY) {
        const hours = Math.floor(diffInSeconds / SECONDS_IN_HOUR);
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < SECONDS_IN_WEEK) {
        const days = Math.floor(diffInSeconds / SECONDS_IN_DAY);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < SECONDS_IN_MONTH) {
        const weeks = Math.floor(diffInSeconds / SECONDS_IN_WEEK);
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < SECONDS_IN_YEAR) {
        const months = Math.floor(diffInSeconds / SECONDS_IN_MONTH);
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(diffInSeconds / SECONDS_IN_YEAR);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
}