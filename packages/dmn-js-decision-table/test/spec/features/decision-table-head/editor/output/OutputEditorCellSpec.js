import { bootstrapModeler, inject } from 'test/helper';

import {
  triggerInputEvent,
  triggerClick
} from 'dmn-js-shared/test/util/EventUtil';

import { query as domQuery } from 'min-dom';

import TestContainer from 'mocha-test-container-support';

import simpleXML from './OutputEditor.dmn';

import CoreModule from 'lib/core';
import DecisionTableHeadModule from 'lib/features/decision-table-head';
import DecisionTableHeadEditorModule from 'lib/features/decision-table-head/editor';
import ModelingModule from 'lib/features/modeling';


describe('decision-table-head/editor - output', function() {

  beforeEach(bootstrapModeler(simpleXML, {
    modules: [
      CoreModule,
      DecisionTableHeadModule,
      DecisionTableHeadEditorModule,
      ModelingModule
    ],
    debounceInput: false
  }));

  let testContainer;

  beforeEach(function() {
    testContainer = TestContainer.get(this);

    const cellEl = domQuery('.output-editor', testContainer);

    // open output editor
    triggerClick(cellEl);
  });


  describe('should edit output name', function() {

    it('set', inject(function(elementRegistry) {

      // given
      const outputBo = elementRegistry.get('output1').businessObject;

      const outputEl = getControl('.ref-output-name', testContainer);

      outputEl.focus();

      // when
      triggerInputEvent(outputEl, 'foo');

      // then
      expect(outputBo.name).to.equal('foo');
    }));


    it('unset', inject(function(elementRegistry) {

      // given
      const outputBo = elementRegistry.get('output1').businessObject;

      const outputEl = getControl('.ref-output-name', testContainer);

      outputEl.focus();

      // when
      triggerInputEvent(outputEl, '');

      // then
      expect(outputBo.name).not.to.exist;
    }));

  });



  describe('should edit output label', function() {

    it('set', inject(function(elementRegistry) {

      // given
      const outputBo = elementRegistry.get('output1').businessObject;

      const outputEl = getControl('.ref-output-label', testContainer);

      outputEl.focus();

      // when
      triggerInputEvent(outputEl, 'foo bar');

      // then
      expect(outputBo.label).to.equal('foo bar');
    }));


    it('unset', inject(function(elementRegistry) {

      // given
      const outputBo = elementRegistry.get('output1').businessObject;

      const outputEl = getControl('.ref-output-label', testContainer);

      outputEl.focus();

      // when
      triggerInputEvent(outputEl, 'foo bar');
      triggerInputEvent(outputEl, '');

      // then
      expect(outputBo.label).not.to.exist;
    }));

  });

});


function getControl(selector, parent) {
  return domQuery('.ref-output-editor ' + selector, parent);
}