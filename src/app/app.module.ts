import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NaviagtionComponent } from './naviagtion/naviagtion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { LandModule } from './land/land.module';
import { fakeBackendProvider } from './fake-backend/fake-land-backend-interceptor';
import { HttpClientModule } from '@angular/common/http'; 
import { StoreModule, State, ActionReducerMap,  } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule } from '@angular/forms';
import { StoreRouterConnectingModule, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { CustomSerializer, RouterStateUrl } from './core/router/custom-route-serializer';
import { ProjectModule } from './project/project.module';
import { RouterEffects } from './core/router/store/router.effects';
import { fakeProjectBackendProvider } from './fake-backend/fake-project-backend-interceptor';
import { undoRedoReducer } from './core/undoredo/store/undoredo.reducer';
import { metaReducers } from './core/metaReducer/metaReducer';

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>
}
export const reducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};

@NgModule({
  declarations: [
    AppComponent,
    NaviagtionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    LandModule,
    ProjectModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({}, {metaReducers}),
    StoreModule.forFeature('routing',reducers),
    StoreModule.forFeature('undoredo',undoRedoReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([RouterEffects]),
    StoreDevtoolsModule.instrument({
      name : 'Template app DevTool',
      maxAge: 25
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    } 
    ),
  ],
  providers: [
    fakeBackendProvider, fakeProjectBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
