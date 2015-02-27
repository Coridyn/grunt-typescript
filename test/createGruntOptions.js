var grunt = require("grunt");
var fs = require("fs");
var path = require("path");

var GruntTs = require("../tasks/typescript");


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



module.exports.createGruntOptions = {
	
	createGruntOptions: function(test){
		"use strict";
		
		test.expect(1);
		
		var fileObj = grunt.task.normalizeMultiTaskFiles({
			src: "",
			dest: ""
		});
		var result = GruntTs.createGruntOptions(
			{},
			grunt,
			fileObj,
			null
		);
		
		test.equal(result, null);
		
		test.done();
	},
	
	
	gWatch: function(test){
		"use strict";
		
		test.expect(1);
		
		// TODO: Avoid interpolation strings here.
		var fileObj = grunt.task.normalizeMultiTaskFiles({
			src: [
				"test/fixtures/gWatch/**/*.ts"
			],
			dest: "test/temp/createGruntOptions/gWatch"
		})
		
		/*
		// We expect the src glob to resolve to:
		"test/ts-specs/config/KwsTypeMapperConfigSpec.ts",
		"test/ts-specs/mocks/AppModelMocks.ts",
		"test/ts-specs/mocks/types/TypeMocks.ts"
		*/
	
		/*
		// And end up as the resolved path:
		"test/ts-specs"
		*/
		
		var result = getOptions({
			watch: true
		}, fileObj);
		
		test.equal(result.gWatch.path, ['']);
		
		
		test.done();
	}
	
};
