// Copyright (c) 2023, Finesoft Afrika and contributors
// For license information, please see license.txt

frappe.ui.form.on('SMS Campaign', {
	refresh: function(frm) {
		if (frm.is_new()) {
			frm.set_df_property("section_break_vtpfy", "hidden", 1);
			frm.set_df_property("section_break_v9fde", "hidden", 1);
			frm.set_df_property("section_break_oi2wt", "hidden", 1);
		} else {
			frm.set_df_property("section_break_vtpfy", "hidden", 0);
			frm.set_df_property("section_break_v9fde", "hidden", 0);
			frm.set_df_property("section_break_oi2wt", "hidden", 0);
		}

		frm.set_query("query", function() {
			return {
				"filters": {
					"trigger_type": frm.doc.trigger_type,
				}
			};
		});

		if (!frm.is_new()) {
			if (frm.fields_dict["sms_list"] && "columns" in frm.doc.__onload) {
				$(frm.fields_dict["sms_list"].wrapper)
					.html(frappe.render_template("sms_list", frm.doc.__onload));
			}	
			
			
			if (frm.fields_dict["message_parameters"] && "columns" in frm.doc.__onload) {
				$(frm.fields_dict["message_parameters"].wrapper)
					.html(frappe.render_template("sms_param_list", frm.doc.__onload))
					.find(".btn-param")
					.on("click", function () {
						let param = $(this).data("param"); 
						let message = frm.doc.message || "";
						frm.set_value("message", message + "{{" + param + "}}");
						console.log($(frm.fields_dict["message"]))
					});
			}
				
			
		}
	},


	trigger_type: function(frm) {
		frm.set_query("query", function() {
			return {
				"filters": {
					"trigger_type": frm.doc.trigger_type,
				}
			};
		});
	}
});
