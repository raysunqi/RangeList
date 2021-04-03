
// In this part of the interview process, we'd like you to come up with an algorithm to
// solve the problem as described below. The problem itself is quite simple to solve. The
// solution needs to be in JavaScript. What we are mainly looking for in this test (other
// than that the solution should work) is, how well you actually write the code.
// We want to see how you write production-quality code in a team setting where
// multiple developers will be collaborating on the codebase.
// Specifically, we are looking for: simple, clean, readable and maintainable code, for
// example:
// - Code organization and submission format. Things like code organization,
// readability, documentation, testing and deliverability are most important here.
// - Your mastery of idiomatic JavaScript (JS) programming. We understand that
// you may not have much experience with JS. We encourage you to take some
// time to research modern JS and best practices, and try your best to apply them
// when writing your test solution.

// Problem Set below:
// Task: Implement a class named 'RangeList'
// A pair of integers define a range, for example: [1, 5). This range
// includes integers: 1, 2, 3, and 4.
// A range list is an aggregate of these ranges: [1, 5), [10, 11), [100,201)
/**
 *
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
class RangeList {

    constructor() {
        this.ranges = [];
    } /**
 * Adds a range to the list
 * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
 */
    add(range) {
        if (!range || range[0] > range[1]) return;

        let i = 0;
        // iterate the range list
        while (i < this.ranges.length && this.ranges[i][0] <= range[1]) {
            let curr = this.ranges[i];

            // if start of range is greater than current's end, move counter to next;
            if (curr[1] < range[0]) {
                i++;
            } else {
                // get the new merged interval
                range = [Math.min(range[0], curr[0]), Math.max(range[1], curr[1])];
                // remove current
                this.ranges.splice(i, 1);
            }
        }
        // insert the range back to ranges
        this.ranges.splice(i, 0, range);
    }
    /**
    * Removes a range from the list
    * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
    */
    remove(range) {
        if (!range || range[0] > range[1]) return;

        let i = 0;
        let left = range[0], right = range[1];

        while (i < this.ranges.length && this.ranges[i][1] < left) {
            i++;
        }
        if (i < this.ranges.length && this.ranges[i][0] < left) {

            let newIntervalBefore = [this.ranges[i][0], left];
            // the interval to delete is between one of the intervals
            if (right < this.ranges[i][1]) {
                let newIntervalAfter = [right, this.ranges[i][1]];
                this.ranges.splice(i, 1, newIntervalBefore, newIntervalAfter);
                return;
            }
            this.ranges.splice(i, 1, newIntervalBefore);
            i++;
        }
        while (i < this.ranges.length && right >= this.ranges[i][1]) {
            this.ranges.splice(i, 1);
        }
        if (i < this.ranges.length && right > this.ranges[i][0]) {
            let newIntervalAfter = [right, this.ranges[i][1]];
            this.ranges.splice(i, 1, newIntervalAfter);
        }
    }
    /**
    * Prints out the list of ranges in the range list
    */
    print() {
        let result = "";
        for (var curr of this.ranges) {
            result += `[${curr[0]},${curr[1]}) `;
        }
        console.log(result.trim());
    }
}
// Example run
const rl = new RangeList();
rl.add([1, 5]);
rl.print();
// Should display: [1, 5)
rl.add([10, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 20]);
rl.print();
// Should display: [1, 5) [10, 20)
rl.add([20, 21]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([2, 4]);
rl.print();
// Should display: [1, 5) [10, 21)
rl.add([3, 8]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 10]);
rl.print();
// Should display: [1, 8) [10, 21)
rl.remove([10, 11]);
rl.print();
// Should display: [1, 8) [11, 21)
rl.remove([15, 17]);
rl.print();
// Should display: [1, 8) [11, 15) [17, 21)
rl.remove([3, 19]);
rl.print();
// Should display: [1, 3) [19, 21)

/*
 * Additional test cases
 */
rl.remove([1, 1]);
rl.print();
// Should display: [1, 3) [19, 21)

rl.remove([1, 2]);
rl.print();
// Should display: [2, 3) [19, 21)

rl.remove([20, 21]);
rl.print();
// Should display: [2, 3) [19, 20)

rl.add([4, 8]);
rl.print();
// Should display: [2, 3) [4, 8) [19, 20)

rl.add([10, 15]);
rl.print();
// Should display: [2, 3) [4, 8) [10, 15) [19, 20)

rl.add([16, 16]);
rl.print();
// Should display: [2, 3) [4, 8) [10, 15) [16, 16) [19, 20)

rl.add([1, 22]);
rl.print();
// Should display: [1, 22)
