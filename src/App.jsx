// Importo l'Header, il Main ed il Footer
import Header from "./components/Header/Header.jsx";
import Main from "./components/Main/Main.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { useState } from 'react';

const App = () => {

    const [selectedTag, setSelectedTag] = useState('');

    return (
        <>
            <Header onTagSelect={setSelectedTag} />
            <Main selectedTag={selectedTag} />
            <Footer />
        </>
    );
}

export default App;