const $ = require("jquery");
const electron = require('electron').remote;
const dialog = electron.dialog;
const fsp = require('fs').promises;

$(document).ready(function () {
    let rows = [];
    function getDefaultCell() {
        let cell = {
            val: '',
            fontFamily: 'Georgia',
            fontSize: 10,
            bold: false,
            italic: false,
            underline: false,
            bgColor: '#FFFFFF',
            textColor: '#000000',
            valign: 'middle',
            halign: 'left',
        };
        return cell;
    }
    function prepareCellDiv(cdiv, cobj) {
        $(cdiv).html(cobj.val);
        $(cdiv).css('font-family', cobj.fontFamily);
        $(cdiv).css('font-size', cobj.fontSize + 'px');
        $(cdiv).css('font-weight', cobj.bold ? 'bold' : 'normal');
        $(cdiv).css('font-style', cobj.italic ? 'italic' : 'normal');
        $(cdiv).css('text-decoration', cobj.underline ? 'underline' : 'none');
        $(cdiv).css('background-color', cobj.bgColor);
        $(cdiv).css('color', cobj.textColor);
        $(cdiv).css('text-align', cobj.halign);


    }
    $('#content-container').on('scroll', function () {
        $('#tl-cell').css('top', $('#content-container').scrollTop());
        $('#tl-cell').css('left', $('#content-container').scrollLeft());
        $('#first-row').css('top', $('#content-container').scrollTop());
        $('#first-col').css('left', $('#content-container').scrollLeft());
    });

    $("#new").on('click', function () {
        rows = [];
        $('#grid').find('.row').each(function () {
            let cells = [];
            $(this).find('.cell').each(function () {
                let cell = getDefaultCell();
                cells.push(cell);
                prepareCellDiv(this, cell);
            })
            rows.push(cells);
        })

        $('#grid .cell:first').click();
        $('#home-menu').click();
    })
    $("#open").on('click', async function () {

        let dobj = await dialog.showOpenDialog();
        let data = await fsp.readFile(dobj.filePaths[0])
        rows = JSON.parse(data);

        let i = 0;
        $('#grid').find('.row').each(function () {
            let j = 0;
            $(this).find('.cell').each(function () {
                let cell = rows[i][j];
                prepareCellDiv(this, cell);
                j++;
            })
            i++;
        })
        $('#grid .cell:first').click();
        $('#home-menu').click();

    })

    // $("#open").on('click', async function () {
    //     let dobj = await dialog.showOpenDialog();
    //     if (dobj.canceled) {
    //         return;
    //     }
    //     else if (dobj.filePaths.length === 0) {
    //         alert("Please select a file");
    //         return;
    //     }
    //     else {
    //         let data = await fsp.readFile(dobj.filePaths[0]);
    //         let rows = JSON.parse(data);
    //         let i = 0;
    //         $('#grid').find('.row').each(function () {
    //             let j = 0;
    //             $(this).find('.cell').each(function () {
    //                 $(this).html(rows[i][j]);
    //                 j++;
    //             })
    //             i++;
    //         })
    //     }

    // })
    $("#save").on('click', async function () {

        // $('#grid').find('.row').each(function () {
        //     let cells = [];
        //     $(this).find('.cell').each(function () {
        //         cells.push($(this).html());

        //     })
        //     rows.push(cells);
        // })
        let dobj = await dialog.showSaveDialog();
        await fsp.writeFile(dobj.filePath, JSON.stringify(rows))
        alert("Saved Succesfully");
        $('#home-menu').click();

    })
    $('#menu-bar > div').on('click', function () {
        $('#menu-bar > div').removeClass('selected');
        $(this).addClass('selected');

        let menuContainerId = $(this).attr('data-content');
        $("#menu-content-container > div").css('display', 'none');
        $('#' + menuContainerId).css('display', 'flex');
    })
    $('#font-family').on('change', function () {
        let fontFamily = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('font-family', fontFamily);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.fontFamily = fontFamily;
        })
    })
    $('#font-size').on('change', function () {
        let fontSize = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('font-size', fontSize + 'px');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.fontSize = fontSize;
        })
    })


    // $('#home-menu').click();
    $('#bold').on('click', function () {
        $(this).toggleClass('selected');
        let bold = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('font-weight', bold ? 'bold' : 'normal');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.bold = bold;
        })
    })
    $('#italic').on('click', function () {
        $(this).toggleClass('selected');
        let italic = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('font-style', italic ? 'italic' : 'normal');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.italic = italic;
        })

    })
    $('#underline').on('click', function () {
        $(this).toggleClass('selected');
        let underline = $(this).hasClass('selected');
        $('#grid .cell.selected').each(function () {
            $(this).css('text-decoration', underline ? 'underline' : 'none');
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.underline = underline;
        })

    })
    $('#bg-color').on('change', function () {
        let bgColor = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('background-color', bgColor);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.bgColor = bgColor;
        })
    })
    $('#text-color').on('change', function () {
        let textColor = $(this).val();
        $('#grid .cell.selected').each(function () {
            $(this).css('color',textColor);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.textColor = textColor;
        })
    })

    $('.halign').on('click', function () {
        $('.halign').removeClass('selected');
        $(this).addClass('selected');
        let halign = $(this).attr('prop-val');
        $('#grid .cell.selected').each(function () {
            $(this).css('text-align', halign);
            let rid = parseInt($(this).attr('rid'));
            let cid = parseInt($(this).attr('cid'));
            let cobj = rows[rid][cid];
            cobj.halign = halign;
        })

    })

    $('#grid .cell').on('click', function (e) {
        if (e.ctrlKey) {
            $(this).addClass('selected');
        }
        else {

            $('#grid .cell').removeClass('selected');
            $(this).addClass('selected');
        }
        let rid = parseInt($(this).attr('rid'));
        let cid = parseInt($(this).attr('cid'));
        let cobj = rows[rid][cid];

        $('#font-family').val(cobj.fontFamily);
        $('#font-size').val(cobj.fontSize);
        if (cobj.bold) {
            $('#bold').addClass('selected');
        }
        else {
            $('#bold').removeClass('selected');
        }

        if (cobj.italic) {
            $('#italic').addClass('selected');
        }
        else {
            $('#italic').removeClass('selected');
        }
        if (cobj.underline) {
            $('#underline').addClass('selected');
        }
        else {
            $('#underline').removeClass('selected');
        }
    })
    $('#grid .cell').on('keypress', function (e) {
        let rid = parseInt($(this).attr('rid'));
        let cid = parseInt($(this).attr('cid'));
        let cobj = rows[rid][cid];
        cobj.val = $(this).html();
    })

    $('#new').click();
})
