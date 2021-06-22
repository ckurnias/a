/* jce - 2.9.3 | 2021-02-25 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2021 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var VK=tinymce.VK,each=tinymce.each,blocks=(tinymce.map,[]);tinymce.create("tinymce.plugins.FormatPlugin",{init:function(ed,url){function addSoftHyphenShortcut(){ed.addCommand("mceSoftHyphen",function(){ed.execCommand("mceInsertContent",!1,ed.plugins.visualchars&&ed.plugins.visualchars.state?'<span data-mce-bogus="1" class="mce-item-hidden mce-item-shy">&shy;</span>':"&shy;")});var keyCode=189;tinymce.isGecko&&(keyCode=173),ed.addShortcut("ctrl+shift+"+keyCode,"softhyphen.desc","mceSoftHyphen")}var self=this;this.editor=ed,ed.addButton("italic",{title:"italic.desc",onclick:function(e){return e.preventDefault(),e.shiftKey?void ed.formatter.toggle("italic-i"):void ed.formatter.toggle("italic")}}),ed.addShortcut("meta+shift+i","italic.desc",function(){ed.formatter.apply("italic-i")}),addSoftHyphenShortcut(),ed.onPreInit.add(function(ed){each(ed.schema.getBlockElements(),function(v,k){return!!/\W/.test(k)||void blocks.push(k.toLowerCase())}),ed.formatter.register("aside",{block:"aside",remove:"all",wrapper:!0}),ed.formatter.register("p",{block:"p",remove:"all"}),ed.formatter.register("div",{block:"div",onmatch:!!ed.settings.forced_root_block&&function(){return!1}}),ed.formatter.register("div_container",{block:"div",wrapper:!0,onmatch:!!ed.settings.forced_root_block&&function(){return!1}}),ed.formatter.register("span",{inline:"span",remove:"all",onmatch:function(){return!1}}),ed.formatter.register("section",{block:"section",remove:"all",wrapper:!0,merge_siblings:!1}),ed.formatter.register("article",{block:"article",remove:"all",wrapper:!0,merge_siblings:!1}),ed.formatter.register("footer",{block:"footer",remove:"all",wrapper:!0,merge_siblings:!1}),ed.formatter.register("header",{block:"header",remove:"all",wrapper:!0,merge_siblings:!1}),ed.formatter.register("nav",{block:"nav",remove:"all",wrapper:!0,merge_siblings:!1}),ed.formatter.register("code",{inline:"code",remove:"all"}),ed.formatter.register("samp",{inline:"samp",remove:"all"}),ed.formatter.register("blockquote",{block:"blockquote",wrapper:1,remove:"all",merge_siblings:!1}),ed.formatter.register("italic-i",{inline:"i",remove:"all"})}),ed.settings.removeformat=[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,footer",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0}],ed.onKeyDown.add(function(ed,e){e.keyCode!==VK.ENTER&&e.keyCode!==VK.UP&&e.keyCode!==VK.DOWN||!e.altKey||self._clearBlocks(ed,e)}),ed.onKeyUp.addToTop(function(ed,e){if(e.keyCode===VK.ENTER){var n=ed.selection.getNode();"DIV"===n.nodeName&&ed.settings.force_block_newlines&&(ed.settings.keep_styles===!1&&ed.dom.removeAllAttribs(n),ed.formatter.apply("p"))}}),ed.onBeforeExecCommand.add(function(ed,cmd,ui,v,o){var p,se=ed.selection,n=se.getNode();switch(cmd){case"FormatBlock":if(!v){if(o.terminate=!0,n===ed.getBody())return;if(ed.undoManager.add(),p=ed.dom.getParent(n,blocks.join(","))||""){var name=p.nodeName.toLowerCase();ed.formatter.get(name)&&ed.formatter.remove(name)}var cm=ed.controlManager.get("formatselect");cm&&cm.select(p)}"dt"!==v&&"dd"!==v||(n&&!ed.dom.getParent(n,"dl")&&ed.execCommand("InsertDefinitionList"),"dt"===v&&"DD"===n.nodeName&&ed.dom.rename(n,"DT"),"dd"===v&&"DT"===n.nodeName&&ed.dom.rename(n,"DD"),o.terminate=!0);break;case"RemoveFormat":if(!v&&!ed.dom.isBlock(n)){var cm=ed.controlManager.get("styleselect");cm&&cm.selectedValue&&ed.execCommand("mceToggleFormat",!1,cm.selectedValue)}}}),ed.onExecCommand.add(function(ed,cmd,ui,v,o){var se=ed.selection,n=se.getNode();switch(cmd){case"mceToggleFormat":"dt"!==v&&"dd"!==v||"DL"===n.nodeName&&0===ed.dom.select("dt,dd",n).length&&ed.formatter.remove("dl")}})},_clearBlocks:function(ed,e){var p,n=ed.selection.getNode();if(p=ed.dom.getParents(n,blocks.join(",")),p&&p.length>1){var tag=ed.getParam("forced_root_block","p");tag||(tag=ed.getParam("force_block_newlines")?"p":"br"),e.preventDefault();var block=p[p.length-1];if(block===ed.getBody())return;var el=ed.dom.create(tag,{}," ");e.keyCode===VK.ENTER||e.keyCode===VK.DOWN?ed.dom.insertAfter(el,block):block.parentNode.insertBefore(el,block),ed.selection.select(el),ed.selection.collapse(1)}}}),tinymce.PluginManager.add("format",tinymce.plugins.FormatPlugin)}();