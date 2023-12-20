
const paragraphs = {
    par1: "A web-based centralized Solana oracle management tool that allows for quick and easy testing of oracle data feeds. A web-based centralized Solana oracle management tool that allows for quick and easy testing of oracle data feeds.",
}

const Landing = () => {
    return (
        <div className="container">
            {Object.values(paragraphs).map((paragraph, index) =>
                <div key={index} className="paragrap-box">
                    {paragraph}
                </div>
            )}

        </div>
    );
};

export default Landing;