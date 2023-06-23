export default function objToStr(obj){
    const result = [];
    for(const key in obj) {
        const val = obj[key];
        result.push(`${key}=${val}`);
    }

    return result.join('&');
}