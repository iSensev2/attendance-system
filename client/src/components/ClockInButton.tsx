function ClockInButton() {
    const [isClockedIn, setIsClockedIn] = useState(false);

    const handleClick = () => {
        setIsClockedIn(!isClockedIn);
    };


    return (
        <button onClick={handleClick}>
            {isClockedIn ? "Clock Out" : "Clock In"}
        </button>
    );
}

export default ClockInButton;