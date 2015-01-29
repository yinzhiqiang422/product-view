/**
 * 
 */

var rootURL = "http://localhost:8080/product/";

function newProduct() {
	$('#dlg').dialog('open').dialog('setTitle', 'New Product');
	$('#fm').form('clear');
}
function editProduct() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$('#dlg').dialog('open').dialog('setTitle', 'Edit Product');
		$('#fm').form('load', row);
		url = 'update_user.php?id=' + row.id;
	}
}

function saveProduct() {
	$.ajax({
		type : 'POST',
		url : rootURL,
		contentType : 'application/json',
		data : formToJSON()
	}).success(function(data) {
		console.log("Guardado exitoso");
		$('#dlg').dialog('close');
		$('#dg').datagrid('reload');
	});

}

function formToJSON() {
	console.log("id " + $('#id').val());
	console.log("name " + $('#name').val());
	return JSON.stringify({
		"id" : $('#id').val(),
		"name" : $('#name').val(),
		"description" : $('#description').val(),
		"price" : $('#price').val(),
	});
}

function deleteProduct() {
	var row = $('#dg').datagrid('getSelected');
	if (row) {
		$.messager.confirm('Confirm',
				'Are you sure you want to delete this Product?', function(r) {
					if (r) {
						$.ajax({
							type : 'DELETE',
							url : rootURL + row.id,
							contentType : 'application/json',
							data : formToJSON()
						}).success(function(data) {
							console.log("Borrado exitoso");
							console.debug($('#dg'));
							$('#dg').datagrid('reload');
						}).error(function(data) {
							$.messager.show({
								title : 'Error',
								msg : result.errorMsg
							});
						});

					}
				});
	}
}

//$(document).ready(function() {
//	$.ajax({
//		url : rootURL
//	}).then(function(remoteData) {
//		$('#dg').datagrid({
//			data : remoteData
//		});
//	});
//
//});