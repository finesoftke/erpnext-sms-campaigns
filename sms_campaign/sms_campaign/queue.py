import frappe;
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from frappe.utils.safe_exec import get_safe_globals

def send_sms_queued(query, parameters, template):

    data = frappe.db.sql(query.query, parameters, as_dict=True)
    for row in data:
        phone = row[query.phone_field]
        msg=frappe.render_template(template, get_context(row))
        phone = format_phone_number(phone)
        
        if phone:
            receiver_list = [phone]
            send_sms(receiver_list = receiver_list, msg = msg)
            frappe.db.commit()


def format_phone_number(mobile_number):
    if mobile_number is None:
        return None

    mobile_number = mobile_number.replace(" ", "")
       
    if len(mobile_number) == 10:
        return "254" + mobile_number[1:]
    elif len(mobile_number) == 9:
        return "254" + mobile_number
    elif len(mobile_number) == 12:
        return "254" + mobile_number[3:]
    elif len(mobile_number) == 13:
        return "254" + mobile_number[4:]
    elif len(mobile_number) == 11:
        return "254" + mobile_number[2:]
    elif len(mobile_number) == 14:
        return "254" + mobile_number[5:]

    return None


def get_context(data):
	data["nowdate"] = frappe.utils.nowdate
	data["frappe"] = frappe._dict(utils=get_safe_globals().get("frappe").get("utils"))

	return data