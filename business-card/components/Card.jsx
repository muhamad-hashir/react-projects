export default function Card() {
    return (
        <div className="card">
            <img
                className="card__image"
                src="/images/mypic.png"
                alt="Profile photo"
            />

            <div className="card__body">
                <h1 className="card__name">Muhammad Hashir</h1>
                <p className="card__role">Full Stack Developer</p>

                <div className="card__actions">
                    <a className="btn btn--light" href="mailto:laura@example.com">
                        Email
                    </a>
                    <a className="btn btn--blue" href="https://linkedin.com" target="_blank" rel="noreferrer">
                        LinkedIn
                    </a>
                </div>

                <div className="card__section">
                    <h2>About</h2>
                    <p>
                        I am a full Stack developer with a particular interest in making
                        things simple and automating daily tasks. I am always looking for new
                        things to learn. 
                    </p>
                </div>

                <div className="card__section">
                    <h2>Interests</h2>
                    <p>
                        Gaming, learning new skills, creating some simple projects, sports,
                        watching sci-fi movies and series, also love to watch fantasy and crime 
                        based series and movies.
                    </p>
                </div>
            </div>

            <div className="card__socials">
                <a href="#"><img src="/images/linkedin.svg" alt="LinkeDln" /></a>
                <a href="#"><img src="/images/facebook.svg" alt="Facebook" /></a>
                <a href="#"><img src="/images/instagram.svg" alt="Instagram" /></a>
                <a href="#"><img src="/images/github.svg" alt="GitHub" /></a>
            </div>
        </div>
    )
}