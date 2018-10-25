(function () {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function (schemaCallback) {
    var cols = [{
        id: "UNIQUEID",
        dataType: tableau.dataTypeEnum.string
    },
	{
		id:"ID",
		dataType: tableau.dataTypeEnum.int
	},
	{
		id:"CONDITION",
		dataType: tableau.dataTypeEnum.string
	},
	{
		id:"COMMONNAME",
		dataType: tableau.dataTypeEnum.string
	},
	{
		id: "TTYPE",
		dataType: tableau.dataTypeEnum.string
	},
	{
		id:"GENUS",
		dataType: tableau.dataTypeEnum.string
	},
	{
		id:"SPP",
		dataType: tableau.dataTypeEnum.string
	},
	{
		id: "location",
		dataType: tableau.dataTypeEnum.geometry
	}
			];

    var tableSchema = {
        id: "BoulderTrees",
        alias: "TreeLocations",
        columns: cols
    };

    schemaCallback([tableSchema]);
};
    myConnector.getData = function(table, doneCallback) {
    $.getJSON("https://cors.io/?https://www-static.bouldercolorado.gov/docs/opendata/Trees_Public.GeoJSON", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0; i < 50; i++ ) { //use this for full data-> i < feat.length; i++) {
            tableData.push({
                "UNIQUEID": feat[i].properties["UNIQUEID"],
				"ID":feat[i].properties["ID"],
				"CONDITION":feat[i].properties["CONDITION"],
				"COMMONNAME":feat[i].properties["COMMONNAME"],
				"TTYPE":feat[i].properties["TTYPE"],
				"GENUS":feat[i].properties["GENUS"],
				"SPP":feat[i].properties["SPP"],
				"location":feat[i].geometry
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
};

    tableau.registerConnector(myConnector);
})();

$(document).ready(function () {
    $("#submitButton").click(function () {
        tableau.connectionName = "BoulderTrees";
        tableau.submit();
    });
});
