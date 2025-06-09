function add_attendance(){
	const style = document.createElement('style');
	style.innerHTML = `

	.flaticon-more {
		display: none !important;
	}

	.m-portlet__head {
		border-radius: calc(var(--border-radius) * 0.85) !important;
	    margin: 15px 0;
	}

	.m-brand.m-brand--skin-dark
	{
		background-color: var(--card-background) !important;
		border-bottom-right-radius: var(--border-radius);
		border-bottom-left-radius: var(--border-radius);
		border-bottom: var(--border-thick) solid var(--border-color) !important;
		height: 80% !important;
	}

	.m-portlet__body,
	.m-portlet__head {

		color: var(--main-font-color) !important;
		backdrop-filter: var(--glass-blur) !important;
		border-radius: var(--border-radius) !important;
	}

	.m-portlet__body,
	.m-portlet__head
	{
	    background-color: var(--glass-bg) !important;
	}

    .m-portlet__head
    {
        //background-color: var(--secondary-bg-color) !important;
    }

	.table {
		border-radius: var(--border-radius) !important;
	}

	.table th ,
	.table td {
		vertical-align: middle !important;
	    padding: 0.75rem !important;
	    text-align: center !important;
	}

	td {
		border-bottom: var(--border-width) solid var(--border-color) !important;
	}

	.table th {
		background-color: var(--bg-color) !important;
		color: var(--main-font-color) !important;
		border-bottom: var(--border-thick) solid var(--border-color) !important;
	}

    .table td {
        background-color: var(--secondary-bg-color) !important;
        text-wrap-mode: nowrap !important;
    }

	.m-portlet__head-tools a.nav-link.m-tabs__link.active {
	    border-radius: var(--border-radius) !important;
	    border: var(--border-width) solid var(--border-color) !important;
	}

	.mr-auto, .m-subheader__title,
	.alert.m-alert--outline.alert-info .close {
	    color: var(--main-font-color) !important;
	}

	.m-subheader__title {
		padding-right: var(--pad-sm) !important;
		margin-right: var(--mar-sm) !important;
	}

	.btn,
	.m-portlet__body,
	.m-portlet__head,
	.table,
	.m-scroll-top,
	.progress.m-progress--lg
	{
		border: var(--border-width) solid var(--border-color) !important;
	}

	.bg-success {
	    background-color: var(--blur-bg) !important;
	}

	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg {
		box-shadow: none !important;
	}

	.progress.m-progress--lg {
	    margin: 20px 0;
	    background-color: var(--light-bg-color);
	}

	.m-grid.m-grid--hor.m-grid--root.m-page,
	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg,
	.m-body,
	.m-stack.m-stack--ver.m-stack--desktop,
	.m-container.m-container--fluid.m-container--full-height,
	header.m-grid__item.m-header,
	div#m_header_topbar,
	body {
		background-color: transparent !important;
	}

	.btn {
	    border-radius: calc(var(--border-radius) * 0.85) ;
	    background-color: var(--btn-active-bg) ;
	    box-shadow: none !important;;
	}

	.btn-brand:hover {
		background-color: var(--btn-active-bg) !important;
	}

	.alert.m-alert--outline.alert-info {
	    background-color: var(--glass-bg);
	    border: var(--border-width) solid var(--border-color) !important;
	    color: var(--main-font-color);
	    font-weight: 400;
	    border-radius: var(--border-radius);
	    backdrop-filter: var(--glass-blur);
	}

	.m-alert__icon {
	    border-radius: var(--border-radius);
	    background-color: var(--blur-bg) !important;
	}

	.attendance-summary {
    	    margin-bottom: var(--mar-md);
    	    display: flex;
    	    justify-content: space-evenly;
    	    align-items: center;
    	    gap: 1%;
    	}

    	.attendance-summary .summary-box {
    	    background-color: var(--secondary-bg-color);
    	    background-color: var(--light-bg-color);
    	    border: var(--border-width) solid var(--border-color) !important;
    	    padding: 8px;
    	    text-align: center;
    	    width: 32.33%;
    	}

    	span.summary-box:first-child {
    	    border-radius: 6px 0 0 6px !important;
    	}

    	span.summary-box:last-child {
    	    border-radius: 0 6px 6px 0 !important;
    	}
	`;
	document.head.appendChild(style);

	const tables = document.querySelectorAll('.col-md-8 table');
    if (!tables.length) return;

    tables.forEach(table => {
        var absentees = 0;
        var presents = 0;

        const theadCell = table.querySelector('thead tr th:nth-child(2)');
        if (!theadCell || theadCell.innerHTML.trim().toLowerCase() !== 'date') return;

        const monthMap = {
            jan: '01', feb: '02', mar: '03', apr: '04',
            may: '05', jun: '06', jul: '07', aug: '08',
            sep: '09', oct: '10', nov: '11', dec: '12'
        };

        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const td = row.querySelector('td:nth-child(2)');
            const td_last = row.querySelector('td:nth-child(4)');
            if (td) {
                const label = td.querySelector('label');
                if (label) {
                    const text = label.textContent.trim();
                    const parts = text.split('-');
                    if (parts.length === 3) {
                        const day = parts[0];
                        const mon = parts[1].toLowerCase();
                        const year = parseFloat(parts[2]) % 1000;
                        const monthNum = monthMap[mon] || mon;
                        label.innerHTML = `&nbsp;&nbsp;${day} - ${monthNum}&nbsp;&nbsp;`;
                        td.style.padding = '0.75rem';
                    }
                }
            }
            if (td_last) {
                const status = td_last.textContent.trim();
                status === 'A' ? absentees++ : presents++;
            }
        });

        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'attendance-summary';
        summaryDiv.innerHTML = `
            <span class="summary-box">Total : ${absentees + presents}</span>
            <span class="summary-box">Present : ${presents}</span>
            <span class="summary-box">Absent : ${absentees}</span>
        `;
        const parent = table.parentNode;
        parent.insertBefore(summaryDiv, table);
    });
}

add_attendance();