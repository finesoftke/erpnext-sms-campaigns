## Sms Campaign ---- A beautiful solution for a complex Problem

This simple but very effective module enables ERPNext to send any kind of SMS message. 

SMS messages play a very important role in any organization that wants to communicate effectively with its stakeholders, be it suppliers customers etc.
This module has two core doctypes. This module integrates with ERPNext's defined SMS Message Modules.

1. SMS Campaign Query: 
    This enable users to create database query that retrieve a list of parameters to be used in composing the SMS messages. It also allows the user to define the phone column to which the message will be sent. The user can also describe parameters that should be defined and are passed to the query to filter the result list. This doctypes should be created by a professioinal with basic SQL knowledge and a good understanding of ERPNext database structure. 
2. SMS Campaign:
    This doctype describe an actual campaign of messages to be sent to the relevant parties. In the campaign the user selects the SMS campaign query to be run.
    The user also defines the type of campaign to run: 
    i. Direct Campaigns send one time messages to the result list immediately on the doctypes submission.
    ii. Triggered Campaigns allow user to send messages to the result list upon any docevent being triggered. 
    iii. Scheduled messages allow users to send messages in based on a given schedule.

Based on the above this module allows the system to send very well ellaborated and defined messages in a wide array of usecases that proved to be difficult implementing with the notification module in ERPNext.
 
 For example - a property management company can send SMS to both the Landlord and the tenant when a payment towards a rent invoice is made.
             - a company can send messages every wednesday to all customers with invoices due over a certain amount.
             - a company issuing loans can send SMS to guarantors of a certain loan if it falls overdue for several days.

Looking forward to implement the same for push notification especially for organizations that rely on customer mobile apps.

For any assistance kindly email: macharianyota@gmail.com/nyota@finesoftafrika.com
#### License

Apache 2.0