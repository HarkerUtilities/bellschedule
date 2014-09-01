$(document).ready(function() {
	$('#signin').click(function() {
		signIn();
	});
	$('#username, #password').keydown(function(e) {
		if (e.keyCode == 13)
			signIn();
	});

	if (window.location.hash.length > 0) {
		$('#username').val(window.location.hash.replace('#',''));
		signIn();
	}
});

function signIn() {
	$('#signin').val('loading...');
	if ($('#password').val() && $('#password').val().length > 0) {
			$.ajax({
				url: 'http://notpri.me/harkerX/php/authenticate.php',
				dataType: 'JSON',
				data: {
					user: $('#username').val(),
					pass: $('#password').val()
				},
				success: function(data) {
					loadSchedule(data['cookie_string']);
				},
				error: function() {
		$('#signin').val('Personalize');
					alert('Something went wrong. Please try again.');
				}
			});
	} else {
			$.ajax({
				url: 'http://notpri.me/harkerX/api.php',
				dataType: 'JSON',
				data: {
					id: $('#username').val(),
					mode: 'schedule'
				},
				success: function(data) {
					showSchedule(data);
				},
				error: function() {
		$('#signin').val('Personalize');
					alert('Something went wrong. Please try again.');
				}
			});
	}
}

function loadSchedule(cookie_string) {
	$.ajax({
		type: 'GET',
		dataType: 'JSON',
		url: 'http://notpri.me/harkerX/harker-student-api/',
		data: {
			mode: 'schedule',
			auth_string: decodeURI(cookie_string)
		},
		success: function(data) {
			showSchedule(data);
		},
		error: function() {
			alert('Something went wrong. Please try again.');
		}
	});
	$('#options').hide();
}

function showSchedule(data) {
			window.location.hash = $('#username').val();
			var html = '';
			html += '<tr>';
			html += '<td>';
			var date = '';
			for (var i = 0; i < data['schedule'].length; i++) {
				if (date != data['schedule'][i]['date']) {
					date = data['schedule'][i]['date'];

					var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
					day = days[(new Date(date)).getDay()];

					html += '</td><td date="' + date + '"><div class="head"><div class="headWrapper">' + day + '<div class="headDate">' + date + '</div></div></div>';
				}
				html += '<div class="period" date_day="' + (new Date(date)).getDay() + '" start_hour="' + data['schedule'][i]['time'].substring(0, 2) + '" start_minute="' + data['schedule'][i]['time'].substring(4, 6) + '">';
				html += '<div class="periodWrapper" style="height: 49px; padding: 5px">';
				html += data['schedule'][i]['title'];
				html += '<br/>';
				html += data['schedule'][i]['time'];
				html += '</div>';
				html += '</div>';

				// spacer
				html += '<div class="period"><div class="periodWrapper" style="height: 4px;"></div></div>';
			}
			html += '</td>';
			html += '</tr>';
			$('#schedule').html(html.replace('<td></td>', ''));

			$('#schedule td').last().append('<p style="text-align:right; margin-right: 5px;">Powered by <a href="http://notpri.me/harkerX/">harkerX</a></p>');
			$('#authenticate').hide();
			$('#leftArrow').hide();
			$('#rightArrow').hide();
			$('#options').hide();
			highlightSchedule();
}

function highlightSchedule() {

	
	
	var period_found = false;
	$('.period').css('background-color', 'white');
	$('.period[date_day]').each(function() {
		var date_day = $(this).attr('date_day');
		var start_hour = $(this).attr('start_hour');
		var start_minute = $(this).attr('start_minute');
		if (parseInt(date_day) == (new Date()).getDate()) { // today
			$(this).css('background-color', '#eee');
			
			var current_hour = (new Date()).getHours()%12;
			if (current_hour == 0)
				current_hour = 12;

			if (parseInt(start_hour) == current_hour) { // this hour
				$(this).css('background-color', '#eee');
				if (!period_found && parseInt(start_minute) <= (new Date()).getMinutes()) { // after this minute
					$(this).css('background-color', '#ddd');
					period_found = true;
					console.log(period_found);
				}
			}

		}
	});
	setTimeout(function() {
		highlightSchedule();
	}, 5000); // reload every five seconds
}