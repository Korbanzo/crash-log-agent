const formatSureness = (sureness) => {
    if (typeof sureness == "object") {
      const num1 = sureness[0].props.children;
      const num2 = sureness[1].props.children;
      const num3 = sureness[2].props.children;
      sureness = parseInt(num1 + num2 + num3);
    }

    return sureness;
}

const SurenessCircle = ({ number }) => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20vh', height: '20vh',
                     padding: '10px', borderRadius: '5px', backgroundColor: 'gray', marginTop: '5vh'}}>

            <div className="sureness-circle" style={{height: '14vh', width: '14vh'}}>
                <div className="sureness-circle" style={{height: '10vh', width: '10vh', background: '#1f1f1f'}}>
                    { formatSureness(number) }
                </div>
            </div>

        </div>
        <h2>
            Sureness
        </h2>
        </div>
    );

}

export default SurenessCircle;