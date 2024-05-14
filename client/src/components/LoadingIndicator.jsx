export const LoadingIndicator = ({size = 32}) => {
    return (
        <div className="loading-indicator">
            <img src={new URL('../assets/icons/loading.png', import.meta.url).href} alt="loading" height={size} width={size} />
        </div>
    )
}