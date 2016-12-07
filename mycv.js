if ( Meteor.isClient ) {
	Template.mycv.rendered = function () {
   /* In your Template.xxx.rendered */
// Set worker URL to package assets
var url=Corporation.find({repondant:Meteor.userId()}).map( function(u) { return u.mycv; } );
var url = url[0]

PDFJS.workerSrc = url
// Create PDF
PDFJS.getDocument(url).then(function getPdfHelloWorld(pdf) {
    // Fetch the first page
    pdf.getPage(1).then(function getPageHelloWorld(page) {
        var scale = 1;
        var viewport = page.getViewport(scale);

        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('pdfcanvas');
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        // Render PDF page into canvas context
        page.render ({ canvasContext: context, viewport: viewport}).promise.then(function () {
            //console.log('you are about to render your cv...')
        });
    });

});
};
}