export function humanReadableSize(size, currentUnit = 'B') {
    if ( size < 1024 ) {
        return `${size}${currentUnit}`
    }

    const newSize = Math.floor(size * 100 / 1024) / 100
    let nextUnit;

    if (currentUnit === 'B') {
        nextUnit = 'KB'
    } else if (currentUnit === 'KB') {
        nextUnit = 'MB'
    } else if (currentUnit === 'MB') {
        nextUnit = 'GB'
    } else {
        nextUnit = 'TB'
    }

    return humanReadableSize(newSize, nextUnit)
}