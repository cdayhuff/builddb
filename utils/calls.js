// Calculate the number of calls since the first day of the current month
function calculateMonthlyCallsCount(calls) {
	let firstCallDate = new Date(calls[0].CALLTIMESTAMP);
	let year = firstCallDate.getFullYear();
	let month = firstCallDate.getMonth();

	let monthlyCalls = calls.filter(call => {
		let callDate = new Date(call.CALLTIMESTAMP);
		return callDate.getFullYear() === year && callDate.getMonth() === month;
	});

	return monthlyCalls.length;
}

// Calculate the total billing for this month
function calculateBilling(calls) {
	let totalBilling = calculateMonthlyCallsCount(calls) * 0.04;
	return totalBilling;
}

// Calculate the total number of calls in the last 7 days
function calculateWeeklyCallsCount(calls) {
	let weekAgo = new Date();
	weekAgo.setDate(weekAgo.getDate() - 7);

	let weeklyCalls = calls.filter(call => {
		let callDate = new Date(call.CALLTIMESTAMP);
		return callDate >= weekAgo;
	});

	return weeklyCalls.length;
}

module.exports = {
	calculateMonthlyCallsCount,
	calculateBilling,
	calculateWeeklyCallsCount
};
