// Copyright (c) 2023, Finesoft Afrika and contributors
// For license information, please see license.txt

frappe.ui.form.on('SMS Campaign', {

	before_save: function(frm) {
		frm.doc.__onload = "";

	},

	before_submit: function(frm) {
		frm.doc.__onload = "";
	},
	
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
					"channel": frm.doc.channel
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
					});
			}
			
			
			if (frm.fields_dict["subject_parameters"] && "columns" in frm.doc.__onload) {
				$(frm.fields_dict["subject_parameters"].wrapper)
					.html(frappe.render_template("sms_param_list", frm.doc.__onload))
					.find(".btn-param")
					.on("click", function () {
						let param = $(this).data("param"); 
						let subject = frm.doc.email_subject || "";
						frm.set_value("email_subject", subject + "{{" + param + "}}");
					});
			}
				
			
		}
	},


	trigger_doctype: function(frm) {
		let get_select_options = function (df, parent_field) {
			// Append parent_field name along with fieldname for child table fields
			let select_value = parent_field ? df.fieldname + "," + parent_field : df.fieldname;

			return {
				value: select_value,
				label: df.fieldname + " (" + __(df.label) + ")",
			};
		};
		
		frappe.db.get_doc("DocType", frm.doc.trigger_doctype)
			.then(doc => {
				let fields = doc.fields;

				let options = $.map(fields, function (d) {
					return in_list(frappe.model.no_value_type, d.fieldtype)
						? null
						: get_select_options(d);
				});
		
				// set value changed options
				frm.set_df_property("value_changed", "options", [""].concat(options));
			})
		
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
