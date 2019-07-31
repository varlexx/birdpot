// Login System
function PirdWindow(link) {
  var login_window = window.open(link, 'PirdBot Login','menubar=no,width=485,height=720,location=no,resizable=no,scrollbars=yes,status=no');
  var timer = setInterval(function() {
    if(login_window.closed) {
      clearInterval(timer);
      location.reload();
    }
  }, 100);
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function delete_cookie( name ) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

function go(url) {
  (url)?window.location.href = url:null;
}

$(function () {
  // Tooltip
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });
  // Menu Center
  $(".header__logo").width($(".header__controle").width());
  // Error Respo
  if ($.trim($('.isError').html()).length == 0) {
    $(".isRespo").css("display","block");
  }
  // Select Guilds
  $("#dashboard").on("click", ".GuildSelect", function(e){
    var GuildID = e.target.id;
    $.ajax({
      type: "POST",
      url: INC_PATH+"/ajax/isGuild.php?pird="+Math.floor(Math.random() * 1000) + 1,
      dataType: "json",
      data: "GuildID="+GuildID,
      success: function(callback) {
        if (callback.check == "true") {
          setCookie("PIRDGUILDS", GuildID, 31104000)
          window.location.href = DASHBOARD_URL+"/"+GuildID
        } else {
          if (callback.bots) {
            var modal =
            '<div class="modal-dialog">'+
              '<div class="modal-content">'+
                '<div class="modal-header">'+
                  '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                  '<h4 class="modal-title">Bot Seçim Menüsü</h4>'+
                '</div>'+
                '<div class="modal-body">';
                  callback.bots.forEach(function(e) {
                    modal += '<div class="panel panel-default panel-k">'+
                      '<div class="panel-body">'+
                        '<div style="margin-bottom: 10px;font-size: 19px;font-weight: 700;">'+e.bot_name+' <div style="font-weight: 100;float: right;">'+e.bot_guilds+' Sunucu</div></div>'+
                        '<a href="https://discordapp.com/oauth2/authorize?scope=bot&response_type=code&permissions=8&client_id='+e.bot_uid+'&guild_id='+GuildID+'&redirect_uri='+URL+'/includes/ajax/inGuild.php" class="btn pird btn-block --green text-center">Sunucuna Ekle</a>'+
                      '</div>'+
                    '</div>'
                  });
                modal +=
                '</div>'+
                '<div class="modal-footer">'+
                  '<button type="button" class="btn pird --red" data-dismiss="modal">Kapat</button>'+
                '</div>'+
              '</div>'+
            '</div>';

            $('#pModal').html(modal);
            $('#pModal').modal("show");
          }
        }
      }
    });
  });
  // Back Guilds
  $("#back_dashboard").click(function(){
    delete_cookie('PIRDGUILDS');
    window.location.href = DASHBOARD_URL
  });
});
