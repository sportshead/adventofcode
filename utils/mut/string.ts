declare global {
    interface String {
        reverse(): string;
    }
}

String.prototype.reverse = function () {
    return [...this].reverse().join("");
};
