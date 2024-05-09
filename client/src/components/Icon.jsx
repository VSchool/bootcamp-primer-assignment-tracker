

export const Icon = ({ name, size = 16 }) => {
    const getImgSrc = () => {
        switch (name) {
            case "down":
                return new URL('../assets/icons/carat-down.png', import.meta.url).href
            case "up":
                return new URL('../assets/icons/carat-up.png', import.meta.url).href
            case "unlock":
                return new URL('../assets/icons/unlock.png', import.meta.url).href
            case "lock":
                return new URL('../assets/icons/lock.png', import.meta.url).href
            default:
                throw Error(`Invalid icon name: ${name}`)
        }
    }


    return (
        <img height={size} width={size} alt={name + ' icon'} src={getImgSrc() || ''} />
    )
}