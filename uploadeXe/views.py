from django.shortcuts import render
# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required

import os 
#UMCloudDj.uploadeXe
from uploadeXe.models import Document
from uploadeXe.forms import ExeUploadForm

def my_view(request):
	current_user = request.user.username
	print("Logged in username: " + current_user)
	return render_to_response(
        	'/base.html',
        	{'current_user': current_user, 'form': form},
        	context_instance=RequestContext(request)
	)

@login_required(login_url='/login/')
def list(request):
    # Handle file upload
    print("Current User logged in is: " + request.user.email)
    if request.method == 'POST':
        form = ExeUploadForm(request.POST, request.FILES)
        if form.is_valid():
            newdoc = Document(exefile = request.FILES['exefile'])
	    uid = str(getattr(newdoc, 'exefile'))
	    print("File name to upload:")
	    print(uid)
	    appLocation = (os.path.dirname(os.path.realpath(__file__)))
            #Get the file and run eXe command 
  	    #Get url / path
	    setattr (newdoc, 'url', 'bull')
            newdoc.save()
	    os.system("echo Current location:")
            os.system("pwd")
	    uid = str(getattr(newdoc, 'exefile'))
	    print("File saved as: ")
            print(uid)
	    unid = uid.split('.um.')[-2]
	    unid = unid.split('/')[-1]  #Unique id here.
            print("Unique id:")
            print (unid)
	    setattr(newdoc, 'uid', unid)
	    #os.system('tree')
	    print("Possible command: ")
	    print('exe_do -x ustadmobile ' + appLocation + '/../UMCloudDj/media/' + uid + ' ' + appLocation + '/../UMCloudDj/media/eXeExport/' + unid )
	    if os.system('exe_do -x ustadmobile ' + appLocation + '/../UMCloudDj/media/' + uid + ' ' + appLocation + '/../UMCloudDj/media/eXeExport/' + unid ) == 0: # If command ran successfully,
	    	uidwe = uid.split('.um.')[-1]
	    	uidwe = uidwe.split('.elp')[-2]
	    	print("Folder name: " + uidwe)
	    	if os.system('cp ' + appLocation + '/../UMCloudDj/media/eXeExport/' + unid + '/' + uidwe + '/ustadpkg_html5.xml ' + appLocation + '/../UMCloudDj/media/eXeExport/' + unid + '/' + uidwe + '_ustadpkg_html5.xml' ) == 0: #ie if command got executed in success
            		setattr(newdoc, 'url', "cow")
	    		newdoc.save()
            		setattr(newdoc, 'success', "YES")
	    		courseURL = '/media/eXeExport' + '/' + unid + '/' + uidwe + '/' + 'deviceframe.html'
	    		setattr(newdoc, 'url', courseURL)
 	    		setattr(newdoc, 'name', uidwe)
	    		setattr(newdoc, 'userid', request.user.id)
	    		newdoc.save()
	    	else:
			    setattr(newdoc, 'success', "NO")
			    newdoc.save()
	        	# Redirect to the document list after POST
                #return HttpResponseRedirect(reverse('uploadeXe.views.list'))
	    else:
		    setattr(newdoc, 'success', "NO")
            newdoc.save()
	# Redirect to the document list after POST
        return HttpResponseRedirect(reverse('uploadeXe.views.list'))

    else:
       form = ExeUploadForm() # A empty, unbound form

    # Load documents for the list page
    #documents = Document.objects.all()
    documents = Document.objects.filter(userid=request.user.id, success="YES")
    current_user = request.user.username
    #for doc in documents:	#Testing..
	#print("elp: " + str(doc.id))
    # Render list page with the documents and the form
    return render_to_response(
        'myapp/list.html',
        {'documents': documents, 'form': form, 'current_user': current_user},
        context_instance=RequestContext(request)
    )
# Create your views here.
