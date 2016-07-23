

$(document).ready(function () {
			 $('#btnAdd').click(function () {
						 var count = 1, first_row = $('#Row2');
							 while(count-- > 0)                    first_row.clone().appendTo('#blacklistgrid');
		});
			/* THIS IS FOR WHEN WE ADD UNKNOWN ATTRIBUTES
			 $('#btnAddCol').click(function () {
					 $("#blacklistgrid tr").each(function(){
							$(this).append("<td><input type='text'/></td>");
					 })
			});
			*/
});
