function History({ history }) {
	return (
		<div id="operation-history">
            <h3>Your moves:</h3>
                <ul>
                    {history.map((operation, index) => (
                        <li key={index}>{operation}</li>
                    ))}
                </ul>
        </div>
	);
}

export default History;
