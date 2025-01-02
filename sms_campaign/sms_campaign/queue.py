import frappe;
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from frappe.utils.safe_exec import get_safe_globals

def send_sms_queued(query, parameters, template):

    data = frappe.db.sql(query.query, parameters, as_dict=True)
    for row in data:
        phone = row[query.recepient_field]
        msg=frappe.render_template(template, get_context(row))
        phone = format_phone_number(phone)
        
        if phone:
            receiver_list = [phone]
            send_sms(receiver_list = receiver_list, msg = msg)
            frappe.db.commit()

def send_email_queued(query, parameters, template, subject, attachments):
    data = frappe.db.sql(query.query, parameters, as_dict=True)
    for row in data:
        email = row[query.recepient_field]
        msg=frappe.render_template(template, get_context(row))
        subj = frappe.render_template(subject, get_context(row))

        attachs = []

        for att in attachments:
            if att.type == 'File':
                files = frappe.get_all("File", filters ={"file_url": row[att.file_url_field]})

                if len(files) > 0:
                    file = file[0]
                    file_doc = frappe.get_doc("File", file.name)


                    filename = file_doc.file_name

                    file_path = frappe.utils.get_site_path("", file_doc.file_url.lstrip("/"))
                    with open(file_path, "rb") as file_content:
                        attachs.append({"fcontent": file_content.read(), "fname": filename})
            else:
                attachs.append({frappe.attach_print(att.print_doctype, row[att.name_query_field], file_name=row[att.name_query_field])})

        
        
        if email:
            receiver_list = [email]
            frappe.sendmail(
                recipients=receiver_list,
                message=msg,
                subject=subj,
                attachments=attachs,
            )
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