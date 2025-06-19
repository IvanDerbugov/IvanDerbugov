document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.linkToSignUp').forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.open('signUp.html', '_blank');
        });
    });

    document.querySelectorAll('.linkToRankings').forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.open('topCreators.html', '_blank');
        });
    });

    document.querySelectorAll('.linkToMarketplace').forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.open('marketplace.html', '_blank');
        });
    });
});

