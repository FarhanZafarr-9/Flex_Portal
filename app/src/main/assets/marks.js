function getValue(cell) {
    const val = parseFloat(cell.textContent);
    return isNaN(val) ? 0 : val;
}

function formatScore(value) {
    if (isNaN(value)) return '-';

    const rounded = Math.round(value * 100) / 100;

    if (rounded % 1 === 0) {
        return rounded.toString();
    }
    else if (Math.round(rounded * 10) / 10 === rounded) {
        return rounded.toFixed(1);
    }
    return rounded.toFixed(2);
}

function setValue(cell, value) {
    cell.textContent = formatScore(value);
}

function calculatePerformanceScore() {
  let allActivityPerformances = [];

  document.querySelectorAll('table').forEach(tbl => {
    const theadRow = tbl.querySelector('thead tr');
    const calcRows = tbl.querySelectorAll('.calculationrow');
    if (!theadRow || calcRows.length <= 0) return;

    const scoreTh = document.createElement('th');
    scoreTh.textContent = 'Score';
    theadRow.insertBefore(scoreTh, theadRow.children[2]);

    const progTh = document.createElement('th');
    progTh.textContent = 'Progress';
    theadRow.insertBefore(progTh, theadRow.children[3]);

    let totals = { obtained: 0, total: 0, avg: 0, min: 0, max: 0 };

    calcRows.forEach(row => {
      const scoreCell = row.insertCell(2);
      const progCell = row.insertCell(3);

      const cells = row.querySelectorAll('td');
      const activityName = cells[0]?.textContent?.trim() || 'Activity';

      const wt = getValue(cells[1]);
      const obtm = getValue(cells[4]);
      const ttm = getValue(cells[5]);
      const avgM = getValue(cells[6]);
      const minM = getValue(cells[8]);
      const maxM = getValue(cells[9]);

      const score = (ttm === 0 || cells[6].textContent.trim() === '')
        ? '-'
        : formatScore(obtm / ttm * wt);
      scoreCell.textContent = score;

      totals.obtained += obtm;
      totals.total += ttm;
      totals.avg += avgM;
      totals.min += minM;
      totals.max += maxM;

      const perfScore = ttm > 0 ? (obtm / ttm) * 100 : 0;
      const progColor = getProgressColor(obtm, minM, avgM, maxM);

      progCell.innerHTML = `
        <div class="circular-progress-container">
          <div class="circular-progress-bar">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <circle cx="10" cy="10" r="7" stroke="#333" stroke-width="3" fill="none"/>
              <circle class="progress-ring" cx="10" cy="10" r="7" stroke-width="3" fill="none"
                stroke="${progColor}"
                stroke-dasharray="${Math.PI * 14}"
                stroke-dashoffset="${Math.PI * 14 * (1 - perfScore / 100)}"/>
            </svg>
          </div>
        </div>`;

      allActivityPerformances.push({ name: activityName, pct: perfScore });

      if (row.cells.length > 7) row.deleteCell(7);
    });

    const totalRow = tbl.querySelector('[class^="totalColumn_"]');
    if (totalRow) {
      totalRow.insertCell(totalRow.cells.length);
      totalRow.insertCell(totalRow.cells.length);

      theadRow.deleteCell(7);

      const totalCells = totalRow.querySelectorAll('td');
      setValue(totalCells[2], parseFloat(totalCells[2].textContent));
      totalCells[3].textContent = `${((totals.obtained / totals.total) * 100).toFixed(0)} %`;
      setValue(totalCells[4], totals.obtained);
      setValue(totalCells[5], totals.total);
      setValue(totalCells[6], totals.avg);
      setValue(totalCells[8], totals.min);
      setValue(totalCells[9], totals.max);

      if (totalRow && totalRow.cells.length > 6) totalRow.deleteCell(7);
    }

    // Removed per-table graph creation here

  });

  // Process Grand Total Marks and Prediction Notes
  document.querySelectorAll('#accordion').forEach(accordion => {
    accordion.querySelectorAll('div[id$="-Grand_Total_Marks"]').forEach(gtDiv => {
      const cardBody = gtDiv.querySelector('.card-body');
      if (!cardBody) return;

      const gtTable = cardBody.querySelector('table');
      if (!gtTable) return;

      const gtTbody = gtTable.querySelector('tbody');
      const gtTfoot = gtTable.querySelector('tfoot');
      const gtThead = gtTable.querySelector('thead');

      if (!gtTbody || !gtTfoot || !gtThead) return;

      let sums = { total: 0, obtained: 0, avg: 0, min: 0, max: 0, count: 0 };

      accordion.querySelectorAll('table').forEach(t => {
        if (t === gtTable) return;

        const rows = t.querySelectorAll('.calculationrow');
        rows.forEach(r => {
          const cells = r.querySelectorAll('td');
          if (cells.length >= 8) {
            let tm = getValue(cells[1]);
            let om = getValue(cells[2]);
            let avgM = (getValue(cells[6]) / getValue(cells[5])) * tm;
            let minM = (getValue(cells[7]) / getValue(cells[5])) * tm;
            let maxM = (getValue(cells[8]) / getValue(cells[5])) * tm;

            sums.total += tm;
            sums.obtained += om;
            sums.avg += avgM;
            sums.min += minM;
            sums.max += maxM;
            sums.count++;
          }
        });
      });

      if (sums.count === 0) {
        sums.min = 0;
        sums.max = 0;
      }

      if (gtTfoot.children.length === 0) {
        const footRow = document.createElement('tr');
        footRow.classList.add('GrandtotalColumn');

        const headersCount = gtThead.querySelectorAll('th').length;

        for (let i = 0; i < headersCount; i++) {
          const cell = document.createElement('td');
          cell.classList.add('text-center');

          switch (i) {
            case 0: cell.classList.add('GrandtotalColMarks'); cell.textContent = formatScore(sums.total); break;
            case 1: cell.classList.add('GrandtotalObtMarks'); cell.textContent = formatScore(sums.obtained); break;
            case 2: cell.classList.add('GrandtotalClassAvg'); cell.textContent = formatScore(sums.avg); break;
            case 3: cell.classList.add('GrandtotalClassMin'); cell.textContent = formatScore(sums.min); break;
            case 4: cell.classList.add('GrandtotalClassMax'); cell.textContent = formatScore(sums.max); break;
            case 5: cell.classList.add('GrandtotalClassStdDev'); cell.textContent = '-'; break;
            default: cell.textContent = '';
          }

          footRow.appendChild(cell);
        }

        gtTfoot.appendChild(footRow);
      }

      const currPct = sums.obtained / sums.total;
      const predictionCard = document.createElement('div');
      predictionCard.className = 'card prediction-note';


      const finalExamDiv = accordion.querySelector(`div[id$="-Final_Exam"]`);

      const projectedMin = Math.round(currPct * 90);
      const projectedMax = Math.min(Math.round(currPct * 105), 100);


      if (finalExamDiv) {
          // Final exam already exists — use alternate note
          const obtained = Math.round(sums.obtained);
          let errorMargin = 0;

            if (obtained < projectedMin) {
              errorMargin = projectedMin - obtained;
            } else if (obtained > projectedMax) {
              errorMargin = obtained - projectedMax;
            } else {
              errorMargin = 0; // within range
            }

          const performance = (obtained >= projectedMax)
            ? 'Excellent'
            : (obtained >= projectedMin)
              ? 'On Track'
              : 'Needs Improvement';

          predictionCard.innerHTML = `
            <div class="card-body text-center" style="color: #ccc;">
          <h5 style="font-weight: 600; color: #f4f4f4; margin-bottom: 8px; text-align: left !important; margin-left: var(--mar-md); text-decoration: underline !important;">
            Final Analysis
          </h5>
          <div style="font-size: 14px; font-weight: 500; background-color: var(--glass-bg); border: var(--border-width) solid var(--border-color) !important; border-radius: var(--border-radius); padding: var(--pad-md); text-align: left;">
            <div style="display: flex; justify-content: space-between;">
              <span>Predicted</span><b>${projectedMin}–${projectedMax}</b>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Obtained</span><b>${obtained}</b>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Error</span><b>${errorMargin}</b>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Performance</span><b>${performance}</b>
            </div>
          </div>
        </div>

          `;
      } else if (sums.total >= 20) {
          // Normal prediction card
          predictionCard.innerHTML = `
            <div class="card-body text-center" style="color: #ccc;">
              <h5 style="font-weight: 600; color: #f4f4f4; margin-bottom: 8px; text-align: left !important ; margin-left: var(--mar-md); text-decoration: underline !important;">
                Note
              </h5>
              <p style="font-size: 14px; font-weight: 500; background-color: var(--glass-bg); border: var(--border-width) solid var(--border-color) !important; border-radius: var(--border-radius); padding: var(--pad-md);">
                If the trend continues, final marks may be around
                <span style="display: inline-block; background-color: #20202078; padding: 4px 10px; border-radius: 6px; color: #fff; font-weight: bold; border: 0.75px solid #55555555 !important">
                  ${projectedMin}–${projectedMax}
                </span> out of 100.
              </p>
            </div>
          `;
      } else {
          // Not enough data
          predictionCard.innerHTML = `
            <div class="card-body text-center" style="color: #ccc;">
              <p style="font-size: 14px;">Not enough data to predict performance yet.</p>
            </div>
          `;
        }

        gtDiv.appendChild(predictionCard);

    });
  });
}

function getProgressColor(obtained, min, avg, max) {
    if (obtained === max) return '#B0B0B0';
    if (obtained === avg) return '#D0D0D0';
    if (obtained > avg) return '#A0A0A0';
    if (obtained > min) return '#808080';
    if (obtained === min) return '#404040';
    return '#333'; // default color
}

function styleTotalRows() {
  const totalRows = document.querySelectorAll('tr[class^="totalColumn_"][class*="totalColumn_"]');

  totalRows.forEach(row => {

    const table = row.closest('table');
    const allRows = table.querySelectorAll('tr');

    if (allRows.length <= 2) return;

    row.querySelectorAll('td, th').forEach(cell => {
      cell.style.setProperty('background-color', 'var(--bg-color)', 'important');
      cell.style.setProperty('border-top', '0.75px solid rgba(85, 85, 85, 0.33)', 'important');
    });
  });
}

function add_marks() {
	const style = document.createElement('style');
	style.innerHTML = `

	.m-footer,
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

	.m-portlet__body
	{
	    background-color: var(--glass-bg) !important;
	}

	.card-body
	{
	    background-color: var(--lighter-bg-color) !important;
	}

    .m-portlet__head

    {
        background-color: var(--secondary-bg-color) !important;
    }

    .card-header, .card-body {
    	margin: var(--mar-sm) 0;
    	border-radius: var(--border-radius) !important;
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

	.table th,
	.card-header {
		background-color: var(--bg-color) !important;
		color: var(--main-font-color) !important;
		border-bottom: var(--border-thick) solid var(--border-color) !important;
	}

	.card-header {
		background-color: var(--light-bg-color) !important;
	    padding: var(--pad-sm) 0;
	}

	h5:not(.card-header h5) {
	    text-align: center !important;
	    margin: 10px 0 20px 0;
	}

    .table td {
        background-color: var(--secondary-bg-color) !important;
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
	.progress.m-progress--lg,
	.card-body,
	.card-header
	{
		border: var(--border-width) solid var(--border-color) !important;
	}

	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg {
		box-shadow: none !important;
	}

	.m-grid.m-grid--hor.m-grid--root.m-page,
	.m-portlet.m-portlet--brand.m-portlet--head-solid-bg,
	.m-body,
	.m-stack.m-stack--ver.m-stack--desktop,
	.m-container.m-container--fluid.m-container--full-height,
	header.m-grid__item.m-header,
	div#m_header_topbar,
	.card,
	body {
		background-color: transparent !important;
	}

	.btn {
	    border-radius: calc(var(--border-radius) * 0.85) ;
	   background-color: var(--btn-active-bg) ;
	    box-shadow: var(--glass-shadow);
	}

	.btn-brand:hover {
		background-color: var(--btn-active-bg) !important;
	}

	.mb-0 .btn {
	    background: transparent;
	    box-shadow: none;
	    border: transparent !important;
	    font-weight: var(--font-medium);
	    color: var(--main-font-color) !important;
	}

	ul.nav.nav-tabs.m-tabs.m-tabs-line.m-tabs-line--right.m-tabs-line-danger {
	    margin: 10px 20px;
	}

	`;
	document.head.appendChild(style);

	document.querySelectorAll(".m-portlet__head-caption").forEach((caption) => {
	if (caption.querySelector(".m-portlet__head-text")?.textContent.trim() === "Student Marks") {
		caption.setAttribute("style", "border-right: var(--border-thick) solid var(--border-color) !important; border-radius: 0px !important; padding-right: 10px;");
		}
	});

	calculatePerformanceScore();
    styleTotalRows();
}

add_marks();