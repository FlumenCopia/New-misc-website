jQuery(document).ready(function($) {
	"use strict";
// Contact form
	$(function() {
	$("#contact2").validate({
    	rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            subject: {
                required: true
            },
			city: {
                required: true
            },
			message: {
                required: true
            }
        },
		messages: {
            name: {
                required: "Please type your name",
                minlength: "Please type your name correctly"
            },
            email: {
                required: "Please type your e-mail correctly"
            },
			city: {
                required: "Please type your city"
            },
            subject: {
                required: "Please type about subject",
                minlength: "To short subject"
            },
			 message: {
                required: "Please type your message",
                minlength: "To short message"
            }
        },
		submitHandler: function(form) {
            $(form).ajaxSubmit({
                type:"POST",
                data: $(form).serialize(),
                url:"process.php",
                success: function() {
                    $('#contact2 :input').attr('disabled', 'disabled');
                    $('#contact2').fadeTo( "slow", 0.15, function() {
                        $(this).find(':input').attr('disabled', 'disabled');
                        $(this).find('label').css('cursor','default');
                        $('#success2').fadeIn();
                    });
                },
                error: function() {
                    $('#contact2').fadeTo( "slow", 0.15, function() {
                        $('#error2').fadeIn();
                    });
                }
            });
        }
    });
});
});