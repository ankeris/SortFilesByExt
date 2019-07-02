const glob = require("glob");
const path = require("path");
const fs = require("fs");
const workingDir = process.cwd();
const args = process.argv.slice(2);

module.exports = () => {
    console.log(args);
    console.log(workingDir);

    const opts = {
        nodir: true
    }

    // options are optional
    glob(`${path.normalize(workingDir)}/**/*`, opts, function (er, files) {
        console.log(files);
        const sortedFiles = files.reduce((accumulator, currentValue) => {
            const currentExtName = path.extname(currentValue).split('.').pop();
            const parent = Object.keys(accumulator).find(file => file === currentExtName);

            if (parent) {
                accumulator[currentExtName].push(currentValue);
            } else {
                accumulator[currentExtName] = [];
                accumulator[currentExtName].push(currentValue);
            }
            return accumulator;
        }, {});
        console.log('\x1b[36m%s\x1b[0m', '================ result:');

        for (const iterator_EXTNAME of Object.keys(sortedFiles)) {
            const currentEXTARRAY = sortedFiles[iterator_EXTNAME];
            for (let index = 0; index < currentEXTARRAY.length; index++) {
                const curr_file = currentEXTARRAY[index];
                const new_dir = `${workingDir}/sorted/${iterator_EXTNAME}/`

                if (!fs.existsSync(path.normalize(new_dir))) {
                    fs.mkdirSync(path.normalize(new_dir), { recursive: true })
                }

                fs.rename(path.normalize(curr_file), path.normalize(new_dir + path.basename(curr_file)), (err) => {
                    if (err) throw err;
                    console.log('Rename complete!');
                });
            }
        }
    })
}

 