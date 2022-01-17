function isValidSting(exposedName, options, property) {
    if (!options.hasOwnProperty(property)) {
        throw new Error(`Field: ${exposedName}, is missing property "${property}"`)
    }
    else if (typeof options[property] !== 'string') {
        throw new Error(`Field: ${exposedName},  options.${property} must be a string`)
    }
    else if (options[property].length === 0) {
        throw new Error(`Field: ${exposedName},  options.${property} must have length of 1 or greater`)
    }
    return true
}

function isValidOptions(options) {
    const validProperties = ['label', 'required', 'viewable', 'field', 'optionsApiExt', 'wishlist', 'checkout', 'headerName'];
    for (let property of Object.keys(options)) {
        if (!validProperties.includes(property)) {
            throw new Error(`Options Property: "${property}" is not an accepted property`)
        }
    }
}
const defaultOptions = {
    optionsApiExt: null
};

const appConfig = {
    addField: function (exposedName, options) {
        isValidOptions(options)
        isValidSting(exposedName, options, 'label');
        // isValidSting(exposedName, options, 'field');
        this[exposedName] = { ...defaultOptions, ...options };
    }
};

// Form Fields

appConfig.addField('cstAssetNameTX', {
    label: 'Asset Name',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstAssetSpecBI', {
    label: 'Asset Spec Form [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstBidExceptionBI', {
    label: 'Bid Exception [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstCompetitiveBid2BI', {
    label: 'Competitive Bid 2 [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstCompetitiveBid3BI', {
    label: 'Competitive Bid 3 [Optional}',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstCostCenterTX', {
    label: 'Cost Center',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstEHSBiohazardousAgentsLI', {
    label: 'Will biohazardous/potentially infectious agents be used within the equipment',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstEHSSpecialtyExhaustLI', {
    label: 'Will there be any specialty exhaust requirements for the equipment?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstEHSSterileEnvironmentLI', {
    label: 'Will you require a sterile working environment?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstEHSStoredEnergyLI', {
    label: 'Will the instrument contain any potentially hazardous stored energy?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstEquipmentDetailsTX', {
    label: 'Please Provide Details',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstEquipmentSpecTX', {
    label: 'Please Specify Equipment',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstEquipmentTX', {
    label: 'Equipment Type',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstEquipmentTradeInBL', {
    label: 'Equipment Trade In',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstEquipmentTradeInTX', {
    label: 'Please Specify Equipment',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstExistingSpecBL', {
    label: 'Model Number Unknown',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

// add on Tririga
appConfig.addField('cstExistingSpecTX', {
    label: 'Model Number',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstExpectedPurchaseMonthLI', {
    label: 'Expected Purchase Month',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstExpectedPurchaseMonthLI',
})

appConfig.addField('cstFunctionLI', {
    label: 'Purpose',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstFunctionLI'
})

appConfig.addField('cstFunctionSpecifyTX', {
    label: 'Please Specify Equipment',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstITComponentBL', {
    label: 'IT Component',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstITComputerLI', {
    label: 'Will this request require a computer?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstITComputerLI',
})

appConfig.addField('cstITSoftwareLI', {
    label: 'Does this Capital Expense Request include software',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstITSoftwareLI',
})

appConfig.addField('cstITValidatedEnvironmentLI', {
    label: 'Will the instrument be in Validated (GXP, GLP, and GMP) environment',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstITValidatedEnvironmentLI',
})

appConfig.addField('cstJustificationTX', {
    label: 'Justification (Max. 1000 Characters)',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstNetworkConnectionLI', {
    label: 'Is there an active network connection port ready for this computer',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstNetworkConnectionLI',
})

appConfig.addField('cstProjectRelatedLI', {
    label: 'Project Related',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstProjectRelatedLI'
})

appConfig.addField('cstProjectedAmountNU', {
    label: 'Projected Equipment Cost',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstProposedBenchLocationTX', {
    label: 'Proposed Bench [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstProposedBuildingTX', {
    label: 'Proposed Building',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstProposedFloorTX', {
    label: 'Proposed Floor',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstProposedSpaceTX', {
    label: 'Proposed Space',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstPurchaseYearLI', {
    label: 'Expected Purchase Year',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstPurchaseYearLI',
})

appConfig.addField('cstQuantityNU', {
    label: 'Quantity',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstRDProjectNameTX', {
    label: 'R&D Project Name',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstRequestPriorityLI', {
    label: 'Priority [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstRequestPriorityLI',
})

appConfig.addField('cstSPAntibodyDrugsLI', {
    label: 'Will antibody drug conjugates or potent compounds be used?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPBiologicalMaterialLI', {
    label: 'Will gases be used?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPChemicalsToBeUsedLI', {
    label: 'Will hazardous chemicals be used?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPFullyGuardedLI', {
    label: 'Will the equipment have unguarded moving parts?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPGenerateWasteLI', {
    label: 'Will it generate waste - hazardous or non-hazardous?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPLaserLI', {
    label: 'Does the instrument contain Class 3B or 4 laser(s)?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstSPLaserLI',
})

appConfig.addField('cstSPRadioactiveSourceLI', {
    label: 'Will the use of the instrument involve radioactive material?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSPXrayGeneratingLI', {
    label: 'X-Ray generating equipment?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstGeneralEhsResponses',
})

appConfig.addField('cstSpecGroupNameTX', {
    label: 'Equipment Group',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstSpecGroupTX', {
    label: 'Model Number [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstSpecialtyFurnitureBO', {
    label: 'Specialty Furniture',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstSpecialtyFurnitureCommentTX', {
    label: 'Please provide details',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstSystemLI', {
    label: 'Is this CER a System that requires purchases from multiple vendors?',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true,
    optionsApiExt: 'cstSystemLI',
})

appConfig.addField('cstTargetOperationalDateDA', {
    label: 'Target Operational Date',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstVendorExternalCompanyTX', {
    label: 'Supplier/Vendor',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstVendorNotFoundBL', {
    label: 'Vendor Unknown',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

// Add on Tririga
appConfig.addField('cstVendorNotFoundTX', {
    label: 'Vendor [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('cstVendorQuoteBI', {
    label: 'Selected Vendor Quote [Optional]',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triDescriptionTX', {
    label: 'Additional Details/Explanation',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestForLI', {
    label: 'Request is for',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedByEmailTX', {
    label: 'Email',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedByTX', {
    label: 'Requested By	',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedByWorkPhoneTX', {
    label: 'Work Phone',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedForEmailTX', {
    label: 'Email',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedForTX', {
    label: 'Requested For',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triRequestedForWorkPhoneTX', {
    label: 'Work Phone',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('triSpecClassCL', {
    label: 'Equipment Category',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('_id', {
    label: 'Record Id',
    required: true,
    viewable: true,
    wishlist: true,
    checkout: true
})

appConfig.addField('website', {
    label: 'Website',
    field: 'website',
    headerName: 'Website',
    // headerAlign: 'center',
    // width: 150,
    // editable: true,
})


delete appConfig.addField;

export default appConfig;