//
//  User.swift
//  plateau.rolling
//
//  Created by Rafael Rocha Gans on 6/16/16.
//  Copyright (c) 2016 heresy. All rights reserved.
//

import Foundation

class UserContext : NSObject {

    private let CONTEXT_USER_DATA_KEY = "last_user_context"
    private let defaults = NSUserDefaults.standardUserDefaults()
    private var dict: [String: String];
    
    var user: UserIdentity
    var isAuthenticated: Bool = false
    
    override init() {
        dict = defaults.objectForKey(CONTEXT_USER_DATA_KEY) as? [String: String] ?? [String: String]()
        user = UserIdentity(data: dict)
        
        super.init()
    }
    
    private func save() {
        
    }

}