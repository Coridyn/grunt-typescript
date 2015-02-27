var grunt = require("grunt");
var fs = require("fs");
var path = require("path");

var GruntTs = require("../tasks/typescript").GruntTs;


function getOptions(options, files){
	if (!options){
		files = options;
		options = {};
	}
	
	return GruntTs.createGruntOptions(
			options,
			grunt,
			files,
			null
		);
}


// Get a gruntFile object.
function getFile(fileConfig){
	var files = grunt.task.normalizeMultiTaskFiles(fileConfig);
	if (files && files.length){
		return files[0];
	}
	return;
}


module.exports.createGruntOptions = {
	
	createGruntOptions: function(test){
		"use strict";
		
		test.expect(3);
		
		var result = GruntTs.createGruntOptions(
			{},
			grunt,
			getFile({
				src: "test/fixtures/gWatch/**/*.ts",
				dest: "test/temp/createGruntOptions/gWatch"
			}),
			null
		);
		
		test.notEqual(result, null);
		test.notEqual(result.tsOpts, null);
		test.equal(result.dest, "test/temp/createGruntOptions/gWatch");
		
		test.done();
	},
	
	
	gWatch: function(test){
		"use strict";
		
		test.expect(1);
		
		/*
		// The src glob will resolve to these files:
		"test/ts-specs/config/KwsTypeMapperConfigSpec.ts",
		"test/ts-specs/mocks/AppModelMocks.ts",
		"test/ts-specs/mocks/types/TypeMocks.ts"
		*/	
		var fileObj = getFile({
			src: [
				"test/fixtures/gWatch/**/*.ts"
			],
			dest: "test/temp/createGruntOptions/gWatch"
		});
		
		var result = getOptions({
			watch: true
		}, fileObj);
		
		// // grunt-typescript@0.6.2+
		// // Correct: "test/fixtures/gWatch"
		// var expectedPath = "test/fixtures/gWatch";
		
		// grunt-typescript@0.6.1
		// Incorrect: "test/fixtures/gWatch/mocks"
		var expectedPath = "test/fixtures/gWatch/mocks";
		
		// We expect the result to be the resolved version of this:
		// ["test/fixtures/gWatch"]
		var expected = [GruntTs.util.normalizePath(path.resolve(expectedPath))];
		test.equal(result.gWatch.path[0], expected[0]);
		
		test.done();
	}
	
};
