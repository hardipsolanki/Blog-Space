const formateRelative = (createdAt: string) => {
    const time = new Date(createdAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000; 

    if (diff < 10) {
        return "just now";
    }
    if (diff < 60) {
        return Math.floor(diff) + " seconds ago";
    }
    if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    }
    if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return hours + (hours === 1 ? " hour ago" : " hours ago");
    }
    if (diff < 604800) {
        const days = Math.floor(diff / 86400);
        return days + (days === 1 ? " day ago" : " days ago");
    }
    if (diff < 2592000) {
        const weeks = Math.floor(diff / 604800);
        return weeks + (weeks === 1 ? " week ago" : " weeks ago");
    }
    if (diff < 31536000) {
        const months = Math.floor(diff / 2592000);
        return months + (months === 1 ? " month ago" : " months ago");
    }
    if (diff < 315360000) {
        const years = Math.floor(diff / 31536000);
        return years + (years === 1 ? " year ago" : " years ago");
    }

    return time.toLocaleString();
}


export { formateRelative };
