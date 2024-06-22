// Importo lo style della card
import buttonStyle from './Button.module.css';

const Button = () => {
    return (
        <>
            <button className={buttonStyle.btn}>
                Leggi di più
            </button>
        </>
    );
}

export default Button;