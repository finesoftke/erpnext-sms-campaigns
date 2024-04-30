(()=>{frappe.templates.sms_list=`<style>
    table.sms-list {
      font-family: arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    .sms-list td, .sms-list th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
    }
        
    .sms-list tr:nth-child(even) {
    background-color: #dddddd;
    }
    .sms-list tr:nth-child(even) td {
    border: 1px solid #fff;
    }
</style>
<table class="sms-list">
    <thead>
        <tr>
            <th style="width: 30%;"> Message </th>
            {% for col in columns %}
            <th> {{col}} </th>
            {% endfor %}
        </tr>
    </thead>
    <tbody>
        {% for row in rows %}
        <tr>
            <td>{{ row["message"] }}</td>
            {% for col in columns %}
                {% if col != "message" %}
                    <td>{{ row[col] }}</td>
                {% endif %}
            {% endfor %}
        </tr>
        {% endfor %}
    </tbody>
</table>`;frappe.templates.sms_param_list=`<div class="clearfix"></div>
<div style="display: flex; padding: 5px; justify-content: space-around; flex-wrap: wrap; background-color: #eeeeee">
    {% for col in columns %}
    <p><button data-param="{{col}}" style="margin: 6px;" class="btn btn-xs btn-default btn-param">
        {{ col }}</button>
    </p>
    {% endfor %}
</div>`;})();
//# sourceMappingURL=sms.bundle.RRI3WLKM.js.map
