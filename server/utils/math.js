export const powerSet = (options) => {
    let ps = [[]];
    
    for (let i = 0; i < options.length; i++) {
        for (let j = 0, len = ps.length; j < len; j++) {
            ps.push(ps[j].concat(options[i]));
        }
    }

    return ps;
};