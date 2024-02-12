function longestCommonPrefix(strs) {
    if (strs.length === 0 || strs.length > 200) return "";

    strs.sort((a, b) => a.length - b.length);
    
    const reference = strs[0];
    for (let i = 0; i < reference.length; i++) {
        for (let j = 1; j < strs.length; j++) {
            if (reference[i] !== strs[j][i]) {
                return reference.substring(0, i);
            }
        }
    }
    return reference;
}

const strs1 = ["flower", "flow", "flight"];
console.log(longestCommonPrefix(strs1));

const strs2 = ["dog", "racecar", "car"];
console.log(longestCommonPrefix(strs2));