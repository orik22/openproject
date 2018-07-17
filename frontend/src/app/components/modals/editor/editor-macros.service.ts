// -- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
// ++

import {OpModalService} from "core-components/op-modals/op-modal.service";
import {Injectable} from "@angular/core";
import {WpButtonMacroModal} from "core-components/modals/editor/macro-wp-button-modal/wp-button-macro.modal";
import {WikiIncludePageMacroModal} from "core-components/modals/editor/macro-wiki-include-page-modal/wiki-include-page-macro.modal";
import {ChildPagesMacroModal} from "core-components/modals/editor/macro-child-pages-modal/child-pages-macro.modal";

@Injectable()
export class EditorMacrosService {

  constructor(readonly opModalService:OpModalService) {
  }

  /**
   * Show a modal to edit the work package button macro settings.
   * Used from within ckeditor.
   */
  public configureWorkPackageButton(typeName?:string, classes?:string):Promise<{ type:string, classes:string }> {
    return new Promise<{ type:string, classes:string }>((resolve, reject) => {
      const modal = this.opModalService.show(WpButtonMacroModal, { type: typeName, classes: classes });
      modal.closingEvent.subscribe((modal:WpButtonMacroModal) => {
        if (modal.changed) {
          resolve({type: modal.type, classes: modal.classes});
        }
      });
    });
  }

  /**
   * Show a modal to edit the wiki include macro.
   * Used from within ckeditor.
   */
  public configureWikiPageInclude(page:string):Promise<string> {
    return new Promise<string>((resolve, _) => {
      const modal = this.opModalService.show(WikiIncludePageMacroModal, { page: page });
      modal.closingEvent.subscribe((modal:WikiIncludePageMacroModal) => {
        if (modal.changed) {
          resolve(modal.page);
        }
      });
    });
  }

  /**
   * Show a modal to edit the wiki include macro.
   * Used from within ckeditor.
   */
  public configureChildPages(page:string, includeParent:string):Promise<object> {
    return new Promise<object>((resolve, _) => {
      const modal = this.opModalService.show(ChildPagesMacroModal, { page: page, includeParent: includeParent });
      modal.closingEvent.subscribe((modal:ChildPagesMacroModal) => {
        if (modal.changed) {
          resolve({
            page: modal.page,
            includeParent: modal.includeParent
          });
        }
      });
    });
  }
}
