import gulp from 'gulp';
// import mocha from 'gulp-mocha';
// import istanbul from 'gulp-istanbul';
// import {Instrumenter} from 'isparta';
import through from 'through2'; 
import ParsedCodeContainer from './test-parser';
import {PrintSummaryContainer} from './test-parser';
import fs from 'fs';

// function testUnit() {
//     return gulp.src('tests/unit/*.js')
//     .pipe(mocha());
// }

// function coverageUnit(done) {
//   gulp.src(['src/**/*.js'])
//     .pipe(istanbul({instrumenter: Instrumenter}))
//     .pipe(istanbul.hookRequire())
//     .on('finish', function() {
//       return testUnit()
//       .pipe(istanbul.writeReports())
//       .on('end', done);
//     });
// }

// gulp.task('test-unit', testUnit);
// gulp.task('coverage-unit', coverageUnit);


let sourceContainer = null;
let testContainer = null;


function processSource() {
  return new Promise(function(resolved) {
    gulp.src('src/**/*.js')
    .pipe(through({objectMode: true}, performProcessSource)) 
    .on('finish', resolved);         
  });
}

function performProcessSource(file, encoding, callback) {
    sourceContainer.add(String(file.contents), file.path);        
    this.push(file);
    callback();  
}

function processTests() {
  return new Promise(function(resolved) {
    gulp.src('tests/**/*.js')
    .pipe(through({objectMode: true}, performProcessTests))
    .on('finish', resolved);          
  });
}

function performProcessTests(file, encoding, callback) {
    testContainer.add(String(file.contents), file.path);        
    this.push(file);
    callback();  
}

function processMissingTests() {  
  for (let sourceContainerItem of sourceContainer.codeSummary) {
    console.log(sourceContainerItem.path);        
    sourceContainerItem.checkIfImportedInTests(testContainer.codeSummary);  
  }  
}

function saveMissingTestsJson(done) { 
  let printSummary = new PrintSummaryContainer(sourceContainer.codeSummary);
  
  let dir = './coverage';
  
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }    
  
  fs.writeFile(`${dir}/missingTests.json`, printSummary.jsonText, done);
}

gulp.task('missing-tests', function() {
  sourceContainer = new ParsedCodeContainer();
  testContainer = new ParsedCodeContainer();

  processSource().then(processTests()).then(function() {
    processMissingTests();
    saveMissingTestsJson();
  });
});
