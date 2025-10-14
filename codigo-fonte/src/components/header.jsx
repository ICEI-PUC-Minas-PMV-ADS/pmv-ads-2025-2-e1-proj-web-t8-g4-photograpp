import React from "react";

function Header() {
    return(
        <header>
                <div class="header-container">
                    <div class="logo">
                        <img src="../public/photograpp-logo.svg" alt="Photograpp" />
                    </div>
                    <div class="login">
                        <nav>
                            <ul>
                                <li><a href="#">Registrar</a></li>
                                <li class="nav-button"><a href="#">Login</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
    )
}

export default Header;