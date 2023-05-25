// Calculate the number of calls since the first day of the current month
function calculateMonthlyCallsCount(mCalls) {
	let firstCallDate = mCalls[0].ROW_COUNT;
	return firstCallDate;
}

// Calculate the total billing for this month
function calculateBilling(avgForCalls) {
	let averageTime = avgForCalls[0].AVERAGE_TIME.toFixed(1);
    const monthlyBill = averageTime;
	return monthlyBill;
}

// Calculate the total number of calls in the last 7 days
function calculateWeeklyCallsCount(calls) {
	let weekAgo = calls[0].ROW_COUNT;
	return weekAgo;
}

module.exports = {
	calculateMonthlyCallsCount,
	calculateBilling,
	calculateWeeklyCallsCount
};
