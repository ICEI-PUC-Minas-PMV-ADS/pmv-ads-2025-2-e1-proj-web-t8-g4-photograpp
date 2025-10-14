import react from 'react';
import Header from '../components/header';

function Home() {
    return (
        <>
            <Header />
            <main>
                <div class="banner">
                    <div class="banner-left">
                        <h1>Sistema de gestão para fotógrafos</h1>
                        <p>Sua operação simplificada e em um só lugar: Organize agenda, projetos, clientes, aprovações e muito mais.</p>
                        <button>Começar</button>
                    </div>
                    <div class="banner-right">
                        <img src="../public/banner.png" alt="Hero Image" width="100%" />
                    </div>
                </div>
            </main>
        </>
    )
}


export default Home