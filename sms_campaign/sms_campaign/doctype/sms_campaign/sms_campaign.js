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
