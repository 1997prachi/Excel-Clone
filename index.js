const $ = require("jquery");
const electron = require('electron').remote;
const dialog = electron.dialog;
const fsp = require('fs').promises;

$(document).ready(function () {
    $('#content-container').on('scroll', function () {
        $('#tl-cell').css('top', $('#content-container').scrollTop());
        $('#tl-cell').css('left', $('#content-container').scrollLeft());
        $('#first-row').css('top', $('#content-container').scrollTop());
        $('#first-col').css('left', $('#content-container').scrollLeft());
    });

    $("#new").on('click', function () {
        $('#grid').find('.row').each(function () {
            $(this).find('.cell').each(function () {
                $(this).html('');

            })
        })

    })
    $("#open").on('click', async function () {
        let dobj = await dialog.showOpenDialog();
        if (dobj.canceled) {
            return;
        }
        else if (dobj.filePaths.length === 0) {
            alert("Please select a file");
            return;
        }
        else {
            let data = await fsp.readFile(dobj.filePaths[0]);
            let rows = JSON.parse(data);
            let i = 0;
            $('#grid').find('.row').each(function () {
                let j = 0;
                $(this).find('.cell').each(function () {
                    $(this).html(rows[i][j]);
                    j++;
                })
                i++;
            })
        }

    })
    $("#save").on('click', async function () {
        let rows = [];
        $('#grid').find('.row').each(function () {
            let cells = [];
            $(this).find('.cell').each(function () {
                cells.push($(this).html());

            })
            rows.push(cells);
        })
        let dobj = await dialog.showSaveDialog();
        if (dobj.cancelled) {
            return;
        }
        else if (dobj.filePath === '') {
            alert("Please Select a file");
            return;
        }
        else {
            await fsp.writeFile(dobj.filePath, JSON.stringify(rows))
            alert("Saved Succesfully");
        }
    })
    $('#menu-bar > div').on('click', function () {
        $('#menu-bar > div').removeClass('selected');
        $(this).addClass('selected');

        let menuContainerId = $(this).attr('data-content');
        $("#menu-content-container > div").css('display', 'none');
        $('#' + menuContainerId).css('display', 'flex');
    })

    $('#home-menu').click();
    $('#bold').on('click', function () {
        $(this).toggleClass('selected');

    })
    $('#italic').on('click', function () {
        $(this).toggleClass('selected');

    })
    $('#underline').on('click', function () {
        $(this).toggleClass('selected');

    })

})
